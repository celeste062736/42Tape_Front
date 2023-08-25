import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

export default function MePage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }
  return (
    <Layout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  )
}
