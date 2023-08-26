import { JWT } from "next-auth/jwt"

export enum Role {
  admin = "admin",
  user = "user",
}

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: Role
  }
}