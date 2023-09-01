import { MainLayout } from '../components/Components'
import { TopBar } from '../components/topbar'
import type { GetServerSideProps } from "next";
import type { UserInfo } from '../components/Components'
import type { Repo } from "../components/Components";
import { getToken } from "next-auth/jwt"
import type { NotificationResponse, Notification } from "../components/topbar"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Home(props: { userInfo: UserInfo, notiInfo: NotificationResponse }) {
  const [isModalOpen, setModalOpen] = useState(false);

  if (props.userInfo.user_id === null) {
    redirect('/signin');
  }
  useEffect(() => {
    if (props.userInfo.is_active === false) {
      setModalOpen(true);
    }
  }, [props.userInfo]);

  useEffect(() => {
    // 이벤트 객체의 타입을 MouseEvent로 명시
    function closeOnDocumentClick(event: MouseEvent) {
      // target을 HTML Element로 타입 단언
      const targetElement = event.target as HTMLElement;
      if (targetElement && targetElement.className !== 'welcome-image') {
        setModalOpen(false);
      }
    }
  
    if (isModalOpen) {
      // 이벤트 리스너에 함수를 연결
      document.addEventListener('click', closeOnDocumentClick);
    }
  
    return () => {
      // 컴포넌트 unmount 또는 isModalOpen 상태 변경 시 이벤트 리스너 제거
      document.removeEventListener('click', closeOnDocumentClick);
    };
  }, [isModalOpen]);

  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">

      <TopBar NotiInfo={ props.notiInfo }></TopBar>
      <MainLayout userInfo={ props.userInfo }></MainLayout>
      {isModalOpen && (
        <div className="overlay" onClick={() => setModalOpen(false)}>
          <img src="/welcome.png" alt="welcome-image" className="welcome-image" />
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  userInfo : UserInfo, notiInfo : NotificationResponse
}> = async ({ req, res }) => {
  const userUnknown : UserInfo = {
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
  const notiUnknown : NotificationResponse = {
    user_sub: '',
    receiver: '',
    number_notifications: 0,
    need_notify: false,
    notificationList: [],
  }
  const token = await getToken({req})
  if (!token) {
    return { props : { userInfo : userUnknown, notiInfo : notiUnknown} }
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
  const userInfo : UserInfo = {
    user_id: repo.targetTapeUser.login,
    level: repo.targetTapeUser.level,
    intra_pic: repo.targetTapeUser.intra_picture || "./default-profile.png",
    stats: [repo.targetUserStats.cumulative_stat1, repo.targetUserStats.cumulative_stat2, repo.targetUserStats.cumulative_stat3, repo.targetUserStats.cumulative_stat4, repo.targetUserStats.cumulative_stat5],
    current_rank: repo.targetTapeUser.current_season_rank,
    yData: repo.yData,
    xLabels: repo.xLabels,
    sub: repo.clientTapeUser.user_id,
    is_active: repo.clientTapeUser.is_activated,
  }

  const resp2 = await fetch(process.env.FETCH_URL+'notification', {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })
  const repo2 : NotificationResponse = await resp2.json()
  const notiInfo : NotificationResponse = {
    user_sub: String(token.sub),
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    need_notify: repo2.need_notify,
    notificationList: repo2.notificationList,
  }
  return { props: { userInfo : userInfo, notiInfo : notiInfo }}
}