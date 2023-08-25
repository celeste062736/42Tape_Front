import NextAuth, { NextAuthOptions } from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school"

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
      if (account) {
        token.userRole = "user"
        console.log('account: ', account)
      }
      console.log('token: ', token)
      return token
    },
  },
}

export default NextAuth(authOptions)
