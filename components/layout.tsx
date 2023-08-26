import type { ReactNode } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
