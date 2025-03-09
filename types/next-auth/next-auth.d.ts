// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the missing id field
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
