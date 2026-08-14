import Storefront from "@/components/storefront";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  // The admin dashboard is only rendered for users whose DB role is ADMIN.
  return <Storefront isAdmin={session?.user?.role === "ADMIN"} />;
}
