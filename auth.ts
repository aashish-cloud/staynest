import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcrypt";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!email || !password) throw new Error("Invalid Credentials");

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Invalid Credentials");

        const isCorrectPassword = await bcrypt.compare(
          password as string,
          user.hashedPassword
        );

        if (!isCorrectPassword) throw new Error("Invalid Credentials");

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
