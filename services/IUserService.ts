import { User } from "next-auth";
export interface IUserService {
  signInCredentials(id: string,): Promise<User> | User;
}