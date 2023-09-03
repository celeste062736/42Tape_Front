import { MainLayout } from '../../components/Components'
import { TopBar } from '../../components/topbar'
import type { GetServerSideProps } from "next";
import type { UserInfo } from '../../components/Components'
import type { Repo } from "../../components/Components";
import { getToken } from "next-auth/jwt"
import { redirect } from "next/navigation";

export default function Home( {userInfo } : { userInfo : UserInfo}) {
  if (userInfo.user_id === null) {
    redirect('/signin')
  }
  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">
      <TopBar></TopBar>
      <MainLayout userInfo={ userInfo }></MainLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  userInfo: UserInfo
}> = async ({ req, res, params }) => {
  const dataUnknown : UserInfo = {
    intra_pic: "unknown",
    level: 0,
    user_id: null,
    stats: [0, 0, 0, 0, 0],
    current_rank: "-",
    yData: [{x: 0, y:0}],
    xLabels: [["0"]],
    sub: '',
    is_active: false,
}
  const token = await getToken({req})
  if (!token) {
    return { props : {userInfo: dataUnknown} }
  }

  let userId : string | undefined;
  if (token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  if (params === undefined) {
    return { props : {userInfo: dataUnknown} }
  }
  let otherId = params.id?.toString()
  const resp = await fetch(process.env.FETCH_URL+'user' + `/${otherId}`, {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })

  const repo : Repo = await resp.json()
  const userInfo : UserInfo = {
    user_id: repo.targetTapeUser.login,
    level: repo.targetTapeUser.level,
    intra_pic: repo.targetTapeUser.intra_picture || process.env.NEXT_PUBLIC_PICTURE!,
    stats: [repo.targetUserStats.cumulative_stat1, repo.targetUserStats.cumulative_stat2, repo.targetUserStats.cumulative_stat3, repo.targetUserStats.cumulative_stat4, repo.targetUserStats.cumulative_stat5],
    current_rank: repo.targetTapeUser.current_season_rank,
    yData: repo.yData,
    xLabels: repo.xLabels,
    sub: repo.clientTapeUser.user_id,
    is_active: repo.clientTapeUser.is_activated,
  }
  return { props: {userInfo: userInfo}}
}