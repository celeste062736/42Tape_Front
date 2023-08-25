import users from "../data/users.role.json";
import { User } from "next-auth";
import { IUserService } from "./IUserService";
export class InMemoryUserService implements IUserService {
  signInCredentials(id: string): User | Promise<User> {
    const user = users.find((user) => {
      const idFound = id === user.id;
      return idFound;
    }) as User;
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}

export const userService = new InMemoryUserService();