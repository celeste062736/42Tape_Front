import { MainLayout } from '../components/Components'
import { TopBar } from '../components/topbar'
import type { GetServerSideProps } from "next";
import type { UserInfo } from '../components/Components'
import type { Repo } from "../components/Components";
import { getToken } from "next-auth/jwt"
import type { NotificationResponse, Notification } from "../components/topbar"
import { redirect } from "next/navigation";

export interface UserInfo_NotiInfo {
  UserInfo : UserInfo;
  NotiInfo : NotificationResponse;
}

export const metadata = {
  title: '42TAPE',
  description: '42 The Art of Peer Evaluation',
}

export interface UserInfoNotiInfoProps {
  userInfo_NotiInfo : UserInfo_NotiInfo;
}

export default function Home(props: UserInfoNotiInfoProps) {
  if (props.userInfo_NotiInfo.UserInfo.user_id === null) {
    redirect('/signin')
  }
  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">
      <TopBar NotiInfo={ props.userInfo_NotiInfo.NotiInfo }></TopBar>
      <MainLayout userInfo={ props.userInfo_NotiInfo.UserInfo }></MainLayout>
    </div>
  )
}

export interface UserInfo_NotiInfo {
  UserInfo : UserInfo;
  NotiInfo : NotificationResponse;
}

export const getServerSideProps: GetServerSideProps<{
  userInfo_NotiInfo: UserInfo_NotiInfo
}> = async ({ req, res }) => {
  const dataUnknown : UserInfo_NotiInfo = {
    UserInfo: {
      intra_pic: "unknown",
      level: 0,
      user_id: null,
      stats: [0, 0, 0, 0, 0],
      current_rank: "-",
      yData: [{x: 0, y:0}],
      xLabels: [["0"]],
      sub: '',
    },
    NotiInfo: {
      user_sub: '',
      receiver: '',
      number_notifications: 0,
      need_notify: false,
      notificationList: [],
  }
}
  const token = await getToken({req})
  if (!token) {
    return { props : {userInfo_NotiInfo: dataUnknown} }
  }

  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  const resp = await fetch(process.env.FETCH_URL+'user', {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })
  const repo : Repo = await resp.json()
  const UserInfo : UserInfo = {
    user_id: repo.targetTapeUser.login,
    level: repo.targetTapeUser.level,
    intra_pic: repo.targetTapeUser.intra_picture || "./default-profile.png",
    stats: [repo.targetUserStats.cumulative_stat1, repo.targetUserStats.cumulative_stat2, repo.targetUserStats.cumulative_stat3, repo.targetUserStats.cumulative_stat4, repo.targetUserStats.cumulative_stat5],
    current_rank: repo.targetTapeUser.current_season_rank,
    yData: repo.yData,
    xLabels: repo.xLabels,
    sub: repo.clientTapeUser.user_id,
  }

  const resp2 = await fetch(process.env.FETCH_URL+'notification', {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })
  const repo2 : NotificationResponse = await resp2.json()
  // console.log('notification');
  // console.log(token);
  // console.log('notification');
  //notificationList에 데이터 수동으로 넣기
  // repo2.notificationList = [
  //   {
  //       "type": "now_no_reward",
  //       "createdAt": "Mon Aug 28 2023",
  //       "notified": false
  //   },
  //   {
  //       "type": "got_new_vote",
  //       "createdAt": "Mon Aug 28 2023",
  //       "notified": true
  //   },
  //   {
  //     "type": "got_new_vote",
  //     "createdAt": "Mon Aug 28 2023",
  //     "notified": true
  //   }
  // ]
  const NotiInfo : NotificationResponse = {
    user_sub: String(token.sub),
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    need_notify: repo2.need_notify,
    // number_notifications: 3,
    // need_notify: true,
    notificationList: repo2.notificationList,
  }
  // console.log(repo2.notificationList);
  // console.log(NotiInfo);
  const data : UserInfo_NotiInfo = {
    UserInfo: UserInfo,
    NotiInfo: NotiInfo,
  }
  return { props: {userInfo_NotiInfo: data}}
}

// const data : UserInfo_NotiInfo = {
//   UserInfo: {
//     intra_pic: "https://cdn.intra.42.fr/users/medium_soohkang.jpg",
//     level: 0,
//     user_id: "soohkang",
//     stats: [0, 0, 0, 0, 0],
//     current_rank: 0,
//     yData: [{x: 0, y:0}],
//     xLabels: {key:"0", label:"0"},
//     sub: '',
//   },
//   NotiInfo: {
//   "receiver": "soohkang",
//   "number_notifications": 0,
//   "need_notify": false,
//   "notificationList": [
//       {
//           "type": "got_new_vote",
//           "createdAt": "Mon Aug 28 2023",
//           "notified": true
//       },
//       {
//           "type": "got_new_vote",
//           "createdAt": "Mon Aug 28 2023",
//           "notified": true
//       }
//   ]
// }
// }