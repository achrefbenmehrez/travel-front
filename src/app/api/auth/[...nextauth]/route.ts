import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { ExtendedUser } from "types/next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_AUTH_API_URL + "/api/v1/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        if (data.accessToken) {
          data.user.accessToken = data.accessToken;
        }
        return data.user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: ExtendedUser }) {
      if (user) {
        token.email = user.email;
        token.userName = user.userName;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.userImage = user.userImage;
        token.phoneNumber = user.phoneNumber;
        token.password = user.password;
        token.isActive = user.isActive;
        token._id = user._id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.email = token.email;
        session.user.userName = token.userName;
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
        session.user.userImage = token.userImage;
        session.user.phoneNumber = token.phoneNumber;
        session.user.password = token.password;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
