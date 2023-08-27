import Layout from "../components/layout"
import { MainLayout, TopBar } from '../components/Components'
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { UserInfoProps, UserInfo } from '../components/Components'
import { getToken } from "next-auth/jwt"
import AccessDenied from "../components/access-denied";

export const metadata = {
  title: '42TAPE',
  description: '42 The Art of Peer Evaluation',
}

export default function Home(props: UserInfoProps) {
  if (props.userInfo.user_id === null) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }
  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">
      <TopBar></TopBar>
      <MainLayout userInfo={ props.userInfo }></MainLayout>
    </div>
  )
}

// export interface UserInfo {
//   intra_pic: string;
//   level: number;
//   user_id: string;
//   stats: number[];
//   current_rank: number;
//   rankHistory: number[];
// };

export const getServerSideProps: GetServerSideProps<{
  userInfo: UserInfo
}> = async ({ req, res }) => {
  const dataUnknown : UserInfo = {
    user_id: null,
    level: 1,
    intra_pic: "unknown",
    stats: [0, 0, 0, 0, 0],
    current_rank: 0,
    rankHistory: [0, 0, 0]
  }
  const token = await getToken({req})
  if (!token) {
    return { props : {userInfo: dataUnknown} }
  }
  const resp = await fetch('http://localhost:8080/user', {
    method: "GET",
    headers: {
      "user-id": "131755",
    }
  })
  const repo = await resp.json()
  console.log(repo)
  console.log(token);
  let userId : string | null;
  if(token.sub === undefined) {
    userId = null;
  } else {
    userId = token.sub;
  }
  const data : UserInfo = {
    user_id: userId,
    level: 1.11,
    intra_pic: "https://cdn.intra.42.fr/users/a4aa2516df401cc437f043810a63ce03/mingekim.jpg",
    stats: [10, 9, 2, 7, 5],
    current_rank: 2,
    rankHistory: [2, 10, 5]
  }
  return { props: {userInfo: data}}
}
