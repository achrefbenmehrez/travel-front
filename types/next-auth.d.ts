import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  email: string;
  userName: string;
  id: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  role: string;
  userImage: string;
  phoneNumber: string;
  password: string;
  isActive: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    userName: string;
    id: string;
    accessToken: string;
    firstName: string;
    lastName: string;
    role: string;
    userImage: string;
    phoneNumber: string;
    password: string;
    isActive: boolean;
  }
}
