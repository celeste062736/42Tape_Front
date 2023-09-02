import { MainLayout } from '../../components/Components'
import { TopBar } from '../../components/topbar'
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt"
import { redirect } from "next/navigation";

export interface FindUser {
  user_id: number
  login: string
  intra_picture: string
}

export interface FindUsers {
  users: FindUser[]
}


export const metadata = {
  title: '42TAPE',
  description: '42 The Art of Peer Evaluation',
}

export default function Home({ users } : { users : FindUser[]}) {
  if (users[0].user_id === 0) {
    redirect('/signin')
  }
  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">
      <TopBar></TopBar>
      <MainLayout userInfo={ users }></MainLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  users: FindUser[]
}> = async ({ req, res, params }) => {
  const dataUnknown : FindUser[] = [
    {
      user_id: 0,
      login: "",
      intra_picture: "",
    }
  ]
  const token = await getToken({req})
  if (!token) {
    return { props : {users: dataUnknown} }
  }

  let userId : string | undefined;
  if (token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  if (params === undefined) {
    return { props : {users: dataUnknown} }
  }
  
  const { search_str } = params;
  const resp = await fetch(process.env.FETCH_URL+`search/${search_str}`, {
    method: "GET",
    headers: userId ? { "user-id": userId } : {},
  })
  const data : FindUsers = await resp.json()
  console.log(data)
  return { props: {users: data.users}}
}