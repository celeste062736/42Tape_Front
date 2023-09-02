"use client"
import React, { useEffect, useRef, useState } from 'react';
import { LogoImg, LogoName } from './logo';
import { Button } from './button';
import { Blank } from './blank';
import { LogoutButton } from './logout';
import useSWR from 'swr';
import { Loading } from './spinner';
// import { post_Notification } from '../pages/api/alarm/[id]';

export interface Notification {
  type: string;
  createdAt: string;
  notified: boolean;
}

export interface NotificationResponse {
  user_sub: string;
  receiver: string;
  number_notifications: number;
  need_notify: boolean;
  notificationList: Notification[];
}

export const SvgIcon = () => (
  <svg id="logo_in_alarm_list" viewBox="0 4 78 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66 49C60.4258 45.0381 59 33 59 27L45 38C45.0384 48.3866 45.9182 55.68 56.5 60V54.5L62 55.5L61 50.5L66 49Z" fill="#6181FF"/>
    <path d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM38.5 21.5C33.8056 16.8056 26.1944 16.8056 21.5 21.5C16.8056 26.1944 16.8056 33.8056 21.5 38.5C26.1944 43.1944 33.8056 43.1944 38.5 38.5C43.1944 33.8056 43.1944 26.1944 38.5 21.5Z" fill="#6181FF"/>
    <circle cx="30" cy="30" r="16" stroke="white" strokeWidth="2"/>
  </svg>
);

export function ListButton() {
    const [showList, setShowList] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div>
        <button ref={buttonRef} className="Button" onClick={() => setShowList(!showList)}>
          <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H30" stroke="black" strokeWidth="2"/>
            <path d="M0 13.5H30" stroke="black" strokeWidth="2"/>
            <path d="M0 26H30" stroke="black" strokeWidth="2"/>
          </svg>
        </button>
  
        {showList && (
          <div className="list-box" ref={listRef}>
            <ul style={{padding: '10px', margin: '0'}}>
              <li><Button name="vote_in_list_box"></Button></li>
              <br></br>
              <li><Button name="rank_in_list_box"></Button></li>
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  export function SearchBar() {
    return (
      <div></div>
      // <div className="input-group">
      //   <input id="searchSpace" type="text" className="form-control" placeholder="Search"></input>
      //   <button id="searchButton" className="Button">
      //     <svg width="30" height="30" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      //       <path d="M27.0693 14.6968C27.0693 22.0257 21.3055 27.8936 14.2847 27.8936C7.26382 27.8936 1.5 22.0257 1.5 14.6968C1.5 7.3679 7.26382 1.5 14.2847 1.5C21.3055 1.5 27.0693 7.3679 27.0693 14.6968Z" stroke="#000000" strokeWidth="3"/>
      //       <line x1="24.1149" y1="24.9966" x2="33.1149" y2="34.9966" stroke="#000000" strokeWidth="3"/>
      //     </svg>
      //   </button>
      // </div>
    )
  }

  // async function post_Notification(url : string, notiInfo : NotificationResponse) {
  //   let userId = notiInfo.user_sub;
  //   //console.log("postredy", notiInfo)
  //   return await fetch(url, {
  //     method: "POST",
  //     // headers: {"user-id" : "141408"},
  //     headers: userId ? { "user-id": userId } : {},
  //     body: JSON.stringify({}),
  // }).catch((error) => console.log(error))
  // }

  export function SvgIconRing({number_notifications} : {number_notifications : number}) {
    return (
    <svg width="22" height="22" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 50C28.4518 50 31.25 47.2018 31.25 43.75H18.75C18.75 47.2018 21.5482 50 25 50Z" fill="#000000"/>
      <path d="M25 5.99453L22.5088 6.49766C16.7985 7.6509 12.5001 12.702 12.5001 18.75C12.5001 20.712 12.0802 25.6164 11.0661 30.4443C10.5627 32.8409 9.88919 35.3363 8.99404 37.5H41.006C40.1108 35.3363 39.4373 32.8409 38.934 30.4442C37.9199 25.6164 37.5001 20.7119 37.5001 18.75C37.5001 12.7019 33.2016 7.65084 27.4913 6.49764L25 5.99453ZM44.4353 37.5C45.133 38.8981 45.9421 40.0031 46.875 40.625H3.125C4.0579 40.0031 4.86702 38.8981 5.56469 37.5C8.37257 31.873 9.37507 21.4974 9.37507 18.75C9.37507 11.1854 14.7506 4.8764 21.8901 3.43451C21.8801 3.33269 21.875 3.22944 21.875 3.125C21.875 1.39911 23.2741 0 25 0C26.7259 0 28.125 1.39911 28.125 3.125C28.125 3.22944 28.1199 3.33267 28.1099 3.43448C35.2494 4.87632 40.6251 11.1854 40.6251 18.75C40.6251 21.4974 41.6275 31.873 44.4353 37.5Z" fill="#000000"/>

      {number_notifications > 0 && (
        <circle cx="38" cy="10" r="10" fill="#FF0000"/>
      )}
    </svg>
    )
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const unknown : NotificationResponse = {
    user_sub: '',
    receiver: '',
    number_notifications: 0,
    need_notify: false,
    notificationList: [],
  }
  export function Alarm(){
    const [notiInfo, setNotiInfo] = useState(unknown);
    const [showList, setShowList] = useState(false);
    const { data, error } = useSWR<NotificationResponse>('/api/alarm', fetcher)
    // const [notiData, setnotiData] = useState(data);
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
      if (data && data !== notiInfo) {
        setNotiInfo(data)
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    useEffect(() => {
      if (data && data !== notiInfo) {
        setNotiInfo(data)
      }
    }, [data])
    useEffect(() => {
      if (notiInfo.number_notifications === 0) {
        fetch('/api/alarm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),

        });
      }
    }, [notiInfo])
    if (error) return <SvgIconRing number_notifications={0}/>
    if (!data) return <SvgIconRing number_notifications={0}/>
    return (
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
        <SvgIconRing number_notifications={notiInfo.number_notifications}/>
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
    );

}

  export function Info() {
    const [isModalOpen, setModalOpen] = useState(false);
  
    const handleClick = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div>
        <button className="Button" onClick={handleClick}>
        <svg width="20" height="22" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 22.5C5.68426 22.5 1.375 17.799 1.375 12C1.375 6.20101 5.68426 1.5 11 1.5C16.3157 1.5 20.625 6.20101 20.625 12C20.625 17.799 16.3157 22.5 11 22.5ZM11 24C17.0751 24 22 18.6274 22 12C22 5.37258 17.0751 0 11 0C4.92487 0 0 5.37258 0 12C0 18.6274 4.92487 24 11 24Z" fill="black"/>
          <path d="M7.22578 8.67922C7.21534 8.88355 7.36987 9.04907 7.55746 9.04907H8.69113C8.88098 9.04907 9.03193 8.88019 9.05744 8.67496C9.17975 7.69077 9.79894 6.97339 10.9027 6.97339C11.8453 6.97339 12.7094 7.48755 12.7094 8.72534C12.7094 9.67749 12.1944 10.1155 11.3827 10.782C10.4575 11.5151 9.72439 12.3721 9.77676 13.7622L9.78084 14.0874C9.78342 14.2925 9.93655 14.4573 10.1246 14.4573H11.2397C11.4296 14.4573 11.5835 14.2894 11.5835 14.0823V13.9241C11.5835 12.8481 11.9588 12.5339 12.9712 11.696C13.8091 11.001 14.6819 10.2297 14.6819 8.61108C14.6819 6.34497 12.9276 5.25 11.0074 5.25C9.26518 5.25 7.35575 6.13592 7.22578 8.67922ZM9.36654 17.3232C9.36654 18.123 9.95132 18.7134 10.7543 18.7134C11.5922 18.7134 12.1682 18.123 12.1682 17.3232C12.1682 16.4949 11.5922 15.9141 10.7543 15.9141C9.95132 15.9141 9.36654 16.4949 9.36654 17.3232Z" fill="black"/>
        </svg>
        </button>
        {isModalOpen && (
          <div className="overlay" onClick={closeModal}>
            <img src="/info.png" alt="info-image" className="info-image" />
          </div>
        )}
      </div>
    );
  }
  
  export function Tools() {
    return (
      <>
        <Alarm></Alarm>
        <Info></Info>
        <LogoutButton></LogoutButton>
      </>
    )
  }
  
  export function TopBar() {
    return (
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
          <Tools></Tools>
        </div>
      </div>
    )
  }