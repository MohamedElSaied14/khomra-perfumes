import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GoogleSignInForm from "@/components/google-signin-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول | Khomra",
  description: "سجّل دخولك بحساب Google لمتابعة طلباتك من خمرة.",
};

const errors: Record<string, string> = {
  OAuthAccountNotLinked: "هذا البريد مسجّل بطريقة دخول أخرى. استخدم نفس الطريقة التي سجّلت بها أول مرة.",
  AccessDenied: "تم رفض الدخول. تأكد من السماح لـ Khomra بالوصول لحسابك.",
  Configuration: "إعدادات تسجيل الدخول غير مكتملة. تواصل معنا وسنحل المشكلة سريعًا.",
  Verification: "انتهت صلاحية رابط الدخول. حاول مرة أخرى.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; error?: string }> }) {
  const params = await searchParams;
  const session = await auth();
  // Only same-origin paths are accepted, so ?callbackUrl= cannot be used as an open redirect.
  const redirectTo = params.callbackUrl?.startsWith("/") ? params.callbackUrl : "/";
  if (session?.user) redirect(redirectTo);

  const configured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const message = params.error ? (errors[params.error] ?? "تعذّر تسجيل الدخول. حاول مرة أخرى.") : null;

  return (
    <main className="login-page">
      <section className="login-art" aria-hidden="true">
        <img src="/products/ambre-dor.png" alt="" />
        <div className="login-art-copy">
          <span className="eyebrow">KHOMRA PARFUMS</span>
          <h2>عطور تترك أثرًا</h2>
          <p>سجّل دخولك لتتابع طلباتك، وتحفظ مفضلاتك، وتصل أولًا لإصداراتنا المحدودة.</p>
        </div>
      </section>

      <section className="login-panel">
        <Link className="logo" href="/">KHOMRA<small>خُمرة</small></Link>
        <span className="eyebrow">تسجيل الدخول</span>
        <h1>أهلًا بك في خمرة</h1>
        <p className="login-lead">ادخل بحساب Google في خطوة واحدة — بدون كلمات مرور ولا رسائل تفعيل.</p>

        {message && <p className="login-error" role="alert">{message}</p>}
        {!configured && <p className="login-error" role="alert">تسجيل الدخول غير مفعّل حاليًا: أضف <code>AUTH_GOOGLE_ID</code> و<code>AUTH_GOOGLE_SECRET</code> في ملف <code>.env</code>.</p>}

        <GoogleSignInForm redirectTo={redirectTo} label="المتابعة باستخدام Google" disabled={!configured} />

        <ul className="login-perks">
          <li>متابعة حالة الطلب لحظة بلحظة</li>
          <li>حفظ عنوان التوصيل لطلباتك القادمة</li>
          <li>عروض وإصدارات محدودة قبل الجميع</li>
        </ul>

        <p className="login-note">بدخولك أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بـ Khomra.</p>
        <p className="login-alt">لسه ماعندكش حساب؟ <Link href="/register">أنشئ حسابك</Link></p>
        <Link className="login-back" href="/">العودة إلى المتجر</Link>
      </section>
    </main>
  );
}
