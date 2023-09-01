import type { ReactNode } from "react"
import Head from "next/head"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <Head>
        <link rel="icon" href="/tape_logo.ico" />
        <title>42TAPE</title>
      </Head>
      <main>{children}</main>
    </html>
  )
}
