import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database" },
  // Required behind proxies/preview deployments where the host header is not AUTH_URL.
  trustHost: true,
  pages: { signIn: "/login", error: "/login", newUser: "/register/welcome" },
  events: {
    // Whoever signs in with ADMIN_EMAIL is promoted automatically, so the owner
    // never has to touch the database by hand.
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      if (!adminEmail || !user.id || !user.email) return;
      if (user.email.toLowerCase() !== adminEmail || user.role === "ADMIN") return;
      await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
    },
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as { role?: "CUSTOMER" | "ADMIN" }).role ?? "CUSTOMER";
      }
      return session;
    },
  },
});
