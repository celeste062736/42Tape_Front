import NextAuth, { NextAuthOptions } from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school"
import users from '../../../data/users.role.json'

enum Role {
  admin = "admin",
  user = "user",
}

function getRoleById(idToFind: string): string | undefined {
  const foundItem = users.find(item => item.id === idToFind);
  return foundItem?.role;
}
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    FortyTwoProvider({
      clientId: (process.env.CLIENT_ID as string),
      clientSecret: (process.env.CLIENT_SECRET as string),
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log(users);
      if (account) {
        const role = getRoleById(<string>token.sub);
        console.log('role: ', role)
        if (role === "admin") {
          token.userRole = Role.admin
        } else {
          token.userRole = Role.user
        }
      }
      console.log('account: ', account)
      console.log('token: ', token)
      return token
    },
  },
  pages: {
    signIn: "/signin",
  }
}

export default NextAuth(authOptions)
