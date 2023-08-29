import Layout from "../components/layout"
import { MainLayout } from '../components/Components'
import { TopBar } from '../components/topbar'
import type { GetServerSideProps } from "next";
import type { UserInfoProps, UserInfo } from '../components/Components'
import type { Repo } from "../components/Components";
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

export const getServerSideProps: GetServerSideProps<{
  userInfo: UserInfo
}> = async ({ req, res }) => {
  const dataUnknown : UserInfo = {
    user_id: null,
    level: 1,
    intra_pic: "unknown",
    stats: [0, 0, 0, 0, 0],
    current_rank: 0,
    yData: [{x: 0, y:0}],
    xLabels: {key:"0", label:"0"},
  }
  const token = await getToken({req})
  if (!token) {
    return { props : {userInfo: dataUnknown} }
  }

  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  const resp = await fetch('http://localhost:8080/user', {
    method: "GET",
    //type script에선 headers에 undefined나 null이 들어가면 에러가 난다.
    //삼항연산자로 userId가 undefined면 빈 객체를 넣어준다.
    //헤더가 빈객체면 서버에서는 헤더가 없는 것으로 인식한다. 그러므로 해당부분 에러처리를 해줘야한다.
    headers: userId ? { "user-id": userId } : {}
  })
  const repo : Repo = await resp.json()
  console.log('token');
  console.log(token);
  console.log('resp');
  const data : UserInfo = {
    user_id: repo.targetTapeUser.login,
    level: repo.targetTapeUser.level,
    intra_pic: repo.targetTapeUser.intra_picture,
    stats: [repo.targetUserStats.cumulative_stat1, repo.targetUserStats.cumulative_stat2, repo.targetUserStats.cumulative_stat3, repo.targetUserStats.cumulative_stat4, repo.targetUserStats.cumulative_stat5],
    current_rank: 2,
    yData: [{x: 0, y:0}],
    xLabels: {key:"0", label:"0"},
  }
  return { props: {userInfo: data}}
}
//   const repo : Repo = await resp.json()
//   console.log('token');
//   console.log(token);
//   console.log('resp');
//   console.log(resp);
//   console.log('repo');
//   console.log(repo);
//   const data : UserInfo = {
//     user_id: repo.clientTapeUser.user_id,
//     level: repo.targetTapeUser.level,
//     intra_pic: repo.targetTapeUser.intra_picture,
//     stats: [repo.targetUserStats.cumulative_stat1, repo.targetUserStats.cumulative_stat2, repo.targetUserStats.cumulative_stat3, repo.targetUserStats.cumulative_stat4, repo.targetUserStats.cumulative_stat5],
//     current_rank: 2,
//     yData: repo.yData,
//     xLabels: repo.xLabels,
//   }
//   return { props: {userInfo: data}}
// }