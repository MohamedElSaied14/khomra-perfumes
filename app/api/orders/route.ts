import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { depositFor, isSize, productById, sizePrice, sizes } from "@/lib/catalog";

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10).max(15),
  address: z.string().trim().min(8).max(300),
  paymentMethod: z.enum(["cod", "instapay"]),
  paymentReference: z.string().trim().min(6).max(100).optional(),
  // The client sends what it wants to buy; prices come from the server catalog only.
  items: z.array(z.object({
    productId: z.number().int().positive(),
    size: z.enum(sizes),
    quantity: z.number().int().min(1).max(10),
  })).min(1).max(20),
}).refine(v => v.paymentMethod !== "instapay" || v.paymentReference, {
  message: "InstaPay reference is required",
  path: ["paymentReference"],
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid order", details: z.flattenError(parsed.error) }, { status: 400 });
  const data = parsed.data;

  // Re-price every line from the catalog — never trust prices sent by the browser.
  const items = [];
  for (const item of data.items) {
    const product = productById(item.productId);
    if (!product || !isSize(item.size)) return NextResponse.json({ error: `Unknown product ${item.productId}` }, { status: 400 });
    const unitPrice = sizePrice(product, item.size);
    items.push({
      productName: product.nameEn,
      size: item.size,
      quantity: item.quantity,
      unitPrice,
      total: unitPrice * item.quantity,
    });
  }

  const session = await auth();
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const deposit = depositFor(total);
  const number = `KHM-${Date.now().toString().slice(-8)}`;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ number, total, deposit, persisted: false, message: "Add DATABASE_URL to persist orders" });
  }

  let order;
  try {
    order = await prisma.order.create({
      data: {
        number,
        userId: session?.user?.id,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        subtotal: total,
        deposit,
        total,
        paymentMethod: data.paymentMethod === "cod" ? "COD" : "INSTAPAY",
        paymentReference: data.paymentReference,
        paymentStatus: data.paymentMethod === "instapay" ? "DEPOSIT_PAID" : "PENDING",
        items: { create: items },
      },
    });
  } catch (error) {
    console.error("[orders] failed to persist order", error);
    return NextResponse.json({ error: "Could not save your order, please try again" }, { status: 500 });
  }

  // A failed confirmation email must not fail an order that is already saved.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "Khomra <onboarding@resend.dev>",
        to: [data.email],
        subject: `تأكيد طلبك من خمرة — ${number}`,
        html: `<div dir="rtl" style="font-family:Arial;color:#1d1b18"><h1>شكرًا لطلبك من خمرة</h1><p>تم استلام طلبك رقم <strong>${number}</strong>.</p><p>الإجمالي: <strong>${total} ج.م</strong></p><p>الديبوزت: <strong>${deposit} ج.م</strong></p><p>سنتواصل معك لتأكيد الطلب والتوصيل.</p></div>`,
        headers: { "Idempotency-Key": `order-${order.id}` },
      });
    } catch (error) {
      console.error("[orders] confirmation email failed", error);
    }
  }

  return NextResponse.json({ number: order.number, total, deposit, persisted: true }, { status: 201 });
}
