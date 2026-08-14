import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "أهلًا بك | Khomra" };

export default async function WelcomePage() {
  const session = await auth();
  if (!session?.user) redirect("/register");
  const isAdmin = session.user.role === "ADMIN";

  return (
    <main className="welcome-page">
      <section className="welcome-card">
        <Link className="logo" href="/">KHOMRA<small>خُمرة</small></Link>
        <span className="eyebrow">{isAdmin ? "حساب إدارة" : "حساب عميل"}</span>
        <h1>أهلًا {session.user.name?.split(" ")[0] ?? "بك"} في خمرة</h1>
        <p>
          {isAdmin
            ? "تم تفعيل صلاحيات الإدارة لحسابك. هتلاقي زر «الإدارة» في أعلى المتجر لمتابعة الطلبات والمنتجات."
            : "حسابك جاهز. طلباتك دلوقتي هتتسجل باسمك، وبياناتك محفوظة للمرات الجاية."}
        </p>
        <Link className="primary" href="/">ابدأ التسوق</Link>
      </section>
    </main>
  );
}
