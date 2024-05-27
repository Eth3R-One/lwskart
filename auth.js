import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./database/mongoClientPromise";
import { userModel } from "./models/user-model";

import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = await userModel.findOne({ email: credentials.email });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password mismatch");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token?.id;
      return session;
    },
  },
});
