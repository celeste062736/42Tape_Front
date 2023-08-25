// import "next-auth/jwt"

import { DefaultSession, DefaultUser } from "next-auth";

export enum Role {
  admin = "admin",
  user = "user",
}
// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

interface IUser extends DefaultUser {
  role?: Role;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
