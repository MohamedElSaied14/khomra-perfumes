import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { signOutAction } from "@/app/actions/auth";

export default async function AuthFab() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link className="auth-fab" href="/login" aria-label="تسجيل الدخول بحساب Google">
        <LogIn />
        <span>تسجيل الدخول</span>
      </Link>
    );
  }

  const label = session.user.name?.split(" ")[0] ?? session.user.email ?? "حسابي";
  return (
    <div className="auth-fab auth-fab-user">
      {session.user.image
        ? <img src={session.user.image} alt="" width={26} height={26} referrerPolicy="no-referrer" />
        : <span className="auth-avatar" aria-hidden="true">{label.slice(0, 1)}</span>}
      <span>{label}</span>
      <form action={signOutAction}>
        <button type="submit" aria-label="تسجيل الخروج"><LogOut /></button>
      </form>
    </div>
  );
}
