import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GoogleSignInForm from "@/components/google-signin-form";

export const metadata: Metadata = {
  title: "إنشاء حساب | Khomra",
  description: "أنشئ حسابك في خمرة بحساب Google وتابع طلباتك وعروضك الخاصة.",
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; error?: string }> }) {
  const params = await searchParams;
  const session = await auth();
  const redirectTo = params.callbackUrl?.startsWith("/") ? params.callbackUrl : "/register/welcome";
  if (session?.user) redirect("/");

  const configured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  return (
    <main className="login-page">
      <section className="login-art" aria-hidden="true">
        <img src="/products/royal-oud.png" alt="" />
        <div className="login-art-copy">
          <span className="eyebrow">KHOMRA PARFUMS</span>
          <h2>انضم إلى الدائرة الخاصة</h2>
          <p>حساب واحد يحفظ بياناتك، يتابع طلباتك، ويفتح لك الإصدارات المحدودة قبل طرحها.</p>
        </div>
      </section>

      <section className="login-panel">
        <Link className="logo" href="/">KHOMRA<small>خُمرة</small></Link>
        <span className="eyebrow">إنشاء حساب</span>
        <h1>ابدأ حكايتك مع خمرة</h1>
        <p className="login-lead">اختر Google وهنجهّز حسابك في ثانية — من غير كلمة مرور تحفظها ولا رسالة تفعيل تنتظرها.</p>

        {params.error && <p className="login-error" role="alert">تعذّر إنشاء الحساب. حاول مرة أخرى.</p>}
        {!configured && <p className="login-error" role="alert">إنشاء الحسابات غير مفعّل حاليًا: أضف <code>AUTH_GOOGLE_ID</code> و<code>AUTH_GOOGLE_SECRET</code> في ملف <code>.env</code>.</p>}

        <GoogleSignInForm redirectTo={redirectTo} label="إنشاء حساب باستخدام Google" disabled={!configured} />

        <ol className="register-steps">
          <li><b>اختر Google</b><small>هنستخدم اسمك وصورتك وبريدك فقط</small></li>
          <li><b>وافق على الصلاحيات</b><small>مافيش أي وصول لبياناتك الأخرى</small></li>
          <li><b>ابدأ التسوق</b><small>حسابك جاهز فورًا وطلباتك متسجلة باسمك</small></li>
        </ol>

        <div className="role-note">
          <b>حساب العميل</b> يُنشأ تلقائيًا لأي مستخدم جديد.
          {adminEmail
            ? <> <b>حساب الإدارة</b> مربوط بالبريد <code>{adminEmail}</code> — أول ما تدخل بيه تترقّى صلاحياتك لأدمن وتظهر لك لوحة الإدارة.</>
            : <> لتفعيل <b>حساب الإدارة</b> ضع بريدك في <code>ADMIN_EMAIL</code> داخل ملف <code>.env</code>.</>}
        </div>

        <p className="login-note">بإنشائك الحساب أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بـ Khomra.</p>
        <p className="login-alt">عندك حساب بالفعل؟ <Link href="/login">سجّل دخولك</Link></p>
        <Link className="login-back" href="/">العودة إلى المتجر</Link>
      </section>
    </main>
  );
}
