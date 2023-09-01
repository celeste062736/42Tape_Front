import { MainLayout } from '../components/Components'
import { TopBar } from '../components/topbar'
import type { GetServerSideProps } from "next";
import type { UserInfo } from '../components/Components'
import type { Repo } from "../components/Components";
import { getToken } from "next-auth/jwt"
import type { NotificationResponse, Notification } from "../components/topbar"
import { redirect } from "next/navigation";
import useSWR from 'swr'
import React, { useState, useEffect, useRef } from 'react';

import { ListButton, SearchBar, Info, SvgIcon } from '../components/topbar'
import { LogoImg, LogoName } from '../components/logo'
import { Blank } from '../components/blank'
import { LogoutButton } from '../components/logout'

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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home(props: { userInfo: UserInfo, notiInfo: NotificationResponse }) {
  const [notiInfo, setNotiInfo] = useState<NotificationResponse>(props.notiInfo)
  const { data, error } = useSWR('/api/alarm', fetcher)
  const [isModalOpen, setModalOpen] = useState(false);

  if (props.userInfo.user_id === null) {
    redirect('/signin');
  }
  const [showList, setShowList] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowList(false);
    }
  };
  useEffect(() => {
    if (notiInfo.need_notify === false) {
      fetch('/api/alarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
    }  
  }, [notiInfo])
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setNotiInfo(data)
    }
  }, [props.notiInfo])
  if (error) return <div>Error!</div>
  if (!data) return <div>loding...</div>
  
  //props.param.id 로 접속한 인트라 아이디 가져오기
  return (
    <div id="root">
      <div className="row align-items-center" style={{margin: '0px'}}>
        <div className="col-1 d-flex justify-content-center align-items-center d-block d-xl-none">
          <ListButton></ListButton>
        </div>
        <div id="logo_img" className="col-1 d-flex justify-content-center align-items-center" style={{width: '60px'}}>
          <LogoImg></LogoImg>
        </div>
        <div className="col-2 d-none d-xl-block" style={{width: '120px'}}>
          <LogoName></LogoName>
        </div>
        <Blank name="top"></Blank>
        <div className="col d-flex justify-content-center align-items-center" style={{height: '100px', padding: 0}}>
          <SearchBar></SearchBar>
        </div>
        <div className="col-2 d-none d-xl-block"></div>
        <div className="col-2 d-flex justify-content-around align-items-center" style={{width: '150px'}}>
        <div>
        <button 
          className={`Button ${notiInfo.need_notify ? 'notify-active' : ''}`} 
          onClick={() => {
            setShowList(!showList);
            if (notiInfo.need_notify) {
              setNotiInfo({
                ...notiInfo,
                need_notify: false,
                number_notifications: 0,
              })
            }
          }
        }
        >
          {/* SVG 코드 생략 */}
          <svg width="22" height="22" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 50C28.4518 50 31.25 47.2018 31.25 43.75H18.75C18.75 47.2018 21.5482 50 25 50Z" fill="#000000"/>
            <path d="M25 5.99453L22.5088 6.49766C16.7985 7.6509 12.5001 12.702 12.5001 18.75C12.5001 20.712 12.0802 25.6164 11.0661 30.4443C10.5627 32.8409 9.88919 35.3363 8.99404 37.5H41.006C40.1108 35.3363 39.4373 32.8409 38.934 30.4442C37.9199 25.6164 37.5001 20.7119 37.5001 18.75C37.5001 12.7019 33.2016 7.65084 27.4913 6.49764L25 5.99453ZM44.4353 37.5C45.133 38.8981 45.9421 40.0031 46.875 40.625H3.125C4.0579 40.0031 4.86702 38.8981 5.56469 37.5C8.37257 31.873 9.37507 21.4974 9.37507 18.75C9.37507 11.1854 14.7506 4.8764 21.8901 3.43451C21.8801 3.33269 21.875 3.22944 21.875 3.125C21.875 1.39911 23.2741 0 25 0C26.7259 0 28.125 1.39911 28.125 3.125C28.125 3.22944 28.1199 3.33267 28.1099 3.43448C35.2494 4.87632 40.6251 11.1854 40.6251 18.75C40.6251 21.4974 41.6275 31.873 44.4353 37.5Z" fill="#000000"/>
      
            {notiInfo.number_notifications > 0 && (
              <circle cx="38" cy="10" r="10" fill="#FF0000"/>
            )}
          </svg>
        </button>
        {showList && (
          <div className={`alarm-list ${showList ? "show" : ""}`} ref={listRef}>
            {notiInfo.notificationList.length > 0 ? (
              <ul style={{ padding: "10px", margin: "0" }}>
                {notiInfo.notificationList.map((notification, index) => (
                  <li key={index} style={{ color: notification.notified ? "grey" : "black", }}>
                    <SvgIcon />
                    {notification.type === "now_no_reward" ? "평가자를 칭찬하면 응모권이 주어져요!!" : 
                     notification.type === "now_reward_candidate" ? "투표를 진행하셨으므로 이번 시즌 이미 응모에 참여했습니다" :
                     "누군가 당신을 최고의 평가자로 투표했습니다!"}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ padding: "10px", textAlign: "center" , width: "250px"}}>
                알림이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
          <Info></Info>
          <LogoutButton></LogoutButton>
        </div>
      </div>
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