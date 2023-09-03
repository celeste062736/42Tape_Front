import "./styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>42tape</title>
        <link rel='icon' href='/tape_logo.ico' />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
