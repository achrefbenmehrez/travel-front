import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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

        if (data.user.accessToken) {
          return data.user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
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
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.email = token.email;
        session.user.userName = token.userName;
        session.user.id = token.id;
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
