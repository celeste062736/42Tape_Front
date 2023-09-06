"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LogoImg, LogoName } from './logo';
import { Button } from './button';
import { Blank } from './blank';
import { LogoutButton } from './logout';
import useSWR from 'swr';
import { Modal } from 'react-bootstrap';
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
  candidateForReward: boolean;
}


export const Ticket_Topbar = ({candidateForReward} :  {candidateForReward : boolean}) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8.4375C0 6.8842 1.2592 5.625 2.8125 5.625H27.1875C28.7408 5.625 30 6.8842 30 8.4375V11.25C30 11.7678 29.5803 12.1875 29.0625 12.1875C27.5092 12.1875 26.25 13.4467 26.25 15C26.25 16.5533 27.5092 17.8125 29.0625 17.8125C29.5803 17.8125 30 18.2322 30 18.75V21.5625C30 23.1158 28.7408 24.375 27.1875 24.375H2.8125C1.2592 24.375 0 23.1158 0 21.5625V18.75C0 18.2322 0.419733 17.8125 0.9375 17.8125C2.4908 17.8125 3.75 16.5533 3.75 15C3.75 13.4467 2.4908 12.1875 0.9375 12.1875C0.419733 12.1875 0 11.7678 0 11.25V8.4375ZM7.5 6.5625V8.4375H9.375V6.5625H7.5ZM9.375 12.1875V10.3125H7.5V12.1875H9.375ZM22.5 12.1875V10.3125H20.625V12.1875H22.5ZM20.625 8.4375H22.5V6.5625H20.625V8.4375ZM9.375 14.0625H7.5V15.9375H9.375V14.0625ZM22.5 15.9375V14.0625H20.625V15.9375H22.5ZM9.375 17.8125H7.5V19.6875H9.375V17.8125ZM22.5 19.6875V17.8125H20.625V19.6875H22.5ZM7.5 21.5625V23.4375H9.375V21.5625H7.5ZM20.625 23.4375H22.5V21.5625H20.625V23.4375Z" fill="#EBC705"/>
    {!candidateForReward && <>
    <path d="M14.9384 9.0157C14.9558 9.00605 14.9775 9 15.0015 9C15.0256 9 15.0473 9.00605 15.0647 9.0157C15.0797 9.02403 15.0995 9.03926 15.1194 9.07312L21.9763 20.7398C22.012 20.8005 22.0113 20.864 21.9785 20.9231C21.962 20.9528 21.9415 20.9724 21.9238 20.9833C21.909 20.9925 21.8901 21 21.8585 21H8.14459C8.11303 21 8.09404 20.9925 8.07932 20.9833C8.06163 20.9724 8.04106 20.9528 8.02461 20.9231C7.9918 20.864 7.99108 20.8005 8.02675 20.7398L14.8837 9.07312C14.9036 9.03926 14.9234 9.02403 14.9384 9.0157ZM15.9815 8.56642C15.5376 7.81119 14.4655 7.81119 14.0216 8.56642L7.16463 20.2331C6.70759 21.0107 7.25628 22 8.14459 22H21.8585C22.7468 22 23.2955 21.0107 22.8385 20.2331L15.9815 8.56642Z" fill="#FF0000"/>
    <path d="M14.0015 19C14.0015 18.4477 14.4493 18 15.0015 18C15.5538 18 16.0015 18.4477 16.0015 19C16.0015 19.5523 15.5538 20 15.0015 20C14.4493 20 14.0015 19.5523 14.0015 19Z" fill="#FF0000"/>
    <path d="M14.0995 12.995C14.0462 12.4623 14.4646 12 15 12C15.5354 12 15.9538 12.4623 15.9005 12.995L15.5498 16.5025C15.5215 16.7849 15.2838 17 15 17C14.7162 17 14.4785 16.7849 14.4502 16.5025L14.0995 12.995Z" fill="#FF0000"/>
    <path d="M14.8837 9.07312L14.6682 8.94645L14.6682 8.94645L14.8837 9.07312ZM14.9384 9.0157L15.0599 9.23422L15.0599 9.23422L14.9384 9.0157ZM8.02675 20.7398L8.24228 20.8665L8.24228 20.8665L8.02675 20.7398ZM8.02461 20.9231L8.24323 20.8019L8.24323 20.8019L8.02461 20.9231ZM8.07932 20.9833L7.9476 21.1958L7.9476 21.1958L8.07932 20.9833ZM21.9238 20.9833L22.0555 21.1958L22.0555 21.1958L21.9238 20.9833ZM21.9785 20.9231L22.1971 21.0444L22.1971 21.0444L21.9785 20.9231ZM21.9763 20.7398L21.7608 20.8665L21.7608 20.8665L21.9763 20.7398ZM15.1194 9.07312L14.9039 9.1998L14.9039 9.1998L15.1194 9.07312ZM15.0647 9.0157L15.1861 8.79718L15.1861 8.79717L15.0647 9.0157ZM14.0216 8.56642L14.2371 8.6931L14.2371 8.6931L14.0216 8.56642ZM15.9815 8.56642L15.766 8.6931L15.766 8.6931L15.9815 8.56642ZM7.16463 20.2331L7.38016 20.3598L7.38016 20.3598L7.16463 20.2331ZM22.8385 20.2331L22.6229 20.3598L22.6229 20.3598L22.8385 20.2331ZM14.0995 12.995L14.3483 12.9702L14.0995 12.995ZM15.9005 12.995L15.6517 12.9702L15.6517 12.9702L15.9005 12.995ZM15.5498 16.5025L15.301 16.4776L15.301 16.4776L15.5498 16.5025ZM14.4502 16.5025L14.699 16.4776L14.699 16.4776L14.4502 16.5025ZM15.0992 9.1998C15.099 9.20025 15.0955 9.20599 15.0874 9.21386C15.0789 9.22216 15.0692 9.22905 15.0599 9.23422L14.817 8.79717C14.7632 8.82705 14.7108 8.8739 14.6682 8.94645L15.0992 9.1998ZM8.24228 20.8665L15.0992 9.1998L14.6682 8.94645L7.81122 20.6131L8.24228 20.8665ZM8.24323 20.8019C8.2452 20.8054 8.2501 20.8166 8.25 20.8335C8.2499 20.8506 8.24469 20.8624 8.24228 20.8665L7.81122 20.6131C7.72942 20.7523 7.73153 20.9101 7.80598 21.0444L8.24323 20.8019ZM8.21104 20.7708C8.23099 20.7832 8.23977 20.7956 8.24323 20.8019L7.80598 21.0444C7.84235 21.11 7.89227 21.1615 7.9476 21.1958L8.21104 20.7708ZM8.14459 20.75C8.14909 20.75 8.15999 20.7506 8.17469 20.7548C8.19004 20.7592 8.20257 20.7656 8.21104 20.7708L7.9476 21.1958C8.00118 21.229 8.06567 21.25 8.14459 21.25V20.75ZM21.8585 20.75H8.14459V21.25H21.8585V20.75ZM21.7921 20.7708C21.8005 20.7656 21.8131 20.7592 21.8284 20.7548C21.8431 20.7506 21.854 20.75 21.8585 20.75V21.25C21.9374 21.25 22.0019 21.229 22.0555 21.1958L21.7921 20.7708ZM21.7599 20.8019C21.7633 20.7956 21.7721 20.7832 21.792 20.7708L22.0555 21.1958C22.1108 21.1615 22.1607 21.11 22.1971 21.0444L21.7599 20.8019ZM21.7608 20.8665C21.7584 20.8624 21.7532 20.8506 21.7531 20.8335C21.753 20.8166 21.7579 20.8054 21.7599 20.8019L22.1971 21.0444C22.2716 20.9101 22.2737 20.7523 22.1919 20.6131L21.7608 20.8665ZM14.9039 9.1998L21.7608 20.8665L22.1919 20.6131L15.3349 8.94645L14.9039 9.1998ZM14.9432 9.23422C14.9339 9.22905 14.9242 9.22216 14.9157 9.21386C14.9076 9.20599 14.9041 9.20025 14.9039 9.1998L15.3349 8.94645C15.2923 8.8739 15.2399 8.82705 15.1861 8.79718L14.9432 9.23422ZM15.0015 9.25C14.984 9.25 14.9638 9.24566 14.9432 9.23422L15.1861 8.79717C15.1308 8.76644 15.0672 8.75 15.0015 8.75V9.25ZM15.0599 9.23422C15.0393 9.24566 15.0191 9.25 15.0015 9.25V8.75C14.9359 8.75 14.8723 8.76644 14.817 8.79717L15.0599 9.23422ZM14.2371 8.6931C14.5843 8.1023 15.4187 8.1023 15.766 8.6931L16.197 8.43975C15.6565 7.52008 14.3466 7.52008 13.806 8.43975L14.2371 8.6931ZM7.38016 20.3598L14.2371 8.6931L13.806 8.43975L6.9491 20.1064L7.38016 20.3598ZM8.14459 21.75C7.45851 21.75 7.01652 20.9785 7.38016 20.3598L6.9491 20.1064C6.39866 21.0429 7.05405 22.25 8.14459 22.25V21.75ZM21.8585 21.75H8.14459V22.25H21.8585V21.75ZM22.6229 20.3598C22.9866 20.9785 22.5446 21.75 21.8585 21.75V22.25C22.949 22.25 23.6044 21.0429 23.054 20.1064L22.6229 20.3598ZM15.766 8.6931L22.6229 20.3598L23.054 20.1064L16.197 8.43975L15.766 8.6931ZM14.2515 19C14.2515 18.5858 14.5873 18.25 15.0015 18.25V17.75C14.3112 17.75 13.7515 18.3096 13.7515 19H14.2515ZM15.0015 18.25C15.4158 18.25 15.7515 18.5858 15.7515 19H16.2515C16.2515 18.3096 15.6919 17.75 15.0015 17.75V18.25ZM15.7515 19C15.7515 19.4142 15.4158 19.75 15.0015 19.75V20.25C15.6919 20.25 16.2515 19.6904 16.2515 19H15.7515ZM15.0015 19.75C14.5873 19.75 14.2515 19.4142 14.2515 19H13.7515C13.7515 19.6904 14.3112 20.25 15.0015 20.25V19.75ZM14.3483 12.9702C14.3097 12.5846 14.6125 12.25 15 12.25V11.75C14.3167 11.75 13.7828 12.34 13.8507 13.0199L14.3483 12.9702ZM15 12.25C15.3875 12.25 15.6903 12.5846 15.6517 12.9702L16.1493 13.0199C16.2172 12.34 15.6833 11.75 15 11.75V12.25ZM15.6517 12.9702L15.301 16.4776L15.7985 16.5274L16.1493 13.0199L15.6517 12.9702ZM15.301 16.4776C15.2855 16.6322 15.1554 16.75 15 16.75V17.25C15.4123 17.25 15.7575 16.9376 15.7985 16.5274L15.301 16.4776ZM15 16.75C14.8446 16.75 14.7145 16.6322 14.699 16.4776L14.2015 16.5274C14.2425 16.9376 14.5877 17.25 15 17.25V16.75ZM14.699 16.4776L14.3483 12.9702L13.8507 13.0199L14.2015 16.5274L14.699 16.4776Z" fill="#FF0000"/></>
    }
  </svg>
);

export const SvgIcon = () => (
  <svg id="logo_in_alarm_list" viewBox="0 4 78 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66 49C60.4258 45.0381 59 33 59 27L45 38C45.0384 48.3866 45.9182 55.68 56.5 60V54.5L62 55.5L61 50.5L66 49Z" fill="#6181FF"/>
    <path d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM38.5 21.5C33.8056 16.8056 26.1944 16.8056 21.5 21.5C16.8056 26.1944 16.8056 33.8056 21.5 38.5C26.1944 43.1944 33.8056 43.1944 38.5 38.5C43.1944 33.8056 43.1944 26.1944 38.5 21.5Z" fill="#6181FF"/>
    <circle cx="60" cy="6" r="6" fill="#FF6600"/>
    <circle cx="30" cy="30" r="16" stroke="white" strokeWidth="2"/>
    <path d="M42 30C42 36.6274 36.6274 42 30 42C23.3726 42 18 36.6274 18 30C18 23.3726 23.3726 18 30 18C36.6274 18 42 23.3726 42 30Z" fill="white"/>
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
          <svg width="65" height="80" viewBox="0 0 65 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="65" height="80" fill="none"/>
            <path d="M17 28H47" stroke="#3E3E3E" strokeWidth="2"/>
            <path d="M17 40H47" stroke="#3E3E3E" strokeWidth="2"/>
            <path d="M17 52H47" stroke="#3E3E3E" strokeWidth="2"/>
          </svg>
        </button>
  
        {showList && (
          <div className="list-box" ref={listRef}>
            <ul className="ul_no_bullet" style={{padding: '10px', margin: '0'}}>
              <li><Button name="vote_in_list_box"></Button></li>
              <br></br>
              <li><Button name="rank_in_list_box"></Button></li>
              <br></br>
              <li><Button name="reward_in_list_box"></Button></li>
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
      <div style={{paddingLeft:'10px', paddingRight:'0px'}}>
    <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 50C28.4518 50 31.25 47.2018 31.25 43.75H18.75C18.75 47.2018 21.5482 50 25 50Z" fill="#000000"/>
      <path d="M25 5.99453L22.5088 6.49766C16.7985 7.6509 12.5001 12.702 12.5001 18.75C12.5001 20.712 12.0802 25.6164 11.0661 30.4443C10.5627 32.8409 9.88919 35.3363 8.99404 37.5H41.006C40.1108 35.3363 39.4373 32.8409 38.934 30.4442C37.9199 25.6164 37.5001 20.7119 37.5001 18.75C37.5001 12.7019 33.2016 7.65084 27.4913 6.49764L25 5.99453ZM44.4353 37.5C45.133 38.8981 45.9421 40.0031 46.875 40.625H3.125C4.0579 40.0031 4.86702 38.8981 5.56469 37.5C8.37257 31.873 9.37507 21.4974 9.37507 18.75C9.37507 11.1854 14.7506 4.8764 21.8901 3.43451C21.8801 3.33269 21.875 3.22944 21.875 3.125C21.875 1.39911 23.2741 0 25 0C26.7259 0 28.125 1.39911 28.125 3.125C28.125 3.22944 28.1199 3.33267 28.1099 3.43448C35.2494 4.87632 40.6251 11.1854 40.6251 18.75C40.6251 21.4974 41.6275 31.873 44.4353 37.5Z" fill="#000000"/>

      {number_notifications > 0 && (
        <circle cx="38" cy="10" r="10" fill="#FF0000"/>
      )}
    </svg>
    </div>
    )
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const unknown : NotificationResponse = {
    user_sub: '',
    receiver: '',
    number_notifications: 0,
    need_notify: false,
    notificationList: [],
    candidateForReward: false,
  }
  export function Alarm(){
    const [notiInfo, setNotiInfo] = useState(unknown);
    const [showList, setShowList] = useState(false);
    const { data, error } = useSWR<NotificationResponse>('/api/alarm', fetcher)
    const [isOpened, setIsOpened] = useState(false);
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
      if (isOpened === false) {
        notiInfo.notificationList.map((notification, index) => {
          notification.notified = true
        })
      } else {
        if (notiInfo.need_notify) {
          setNotiInfo({
            ...notiInfo,
            need_notify: false,
            number_notifications: 0,
          })
          fetch('/api/alarm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
        }
      }
    }, [isOpened])
    if (error) {
      return (
        <>
          <div>
            <Ticket_Topbar candidateForReward={false}></Ticket_Topbar>
          </div>
          <div>
            <SvgIconRing number_notifications={0}/>
          </div>
        </>
      )
    }
    if (!data) {
      return (
        <>
        <div>
          <Ticket_Topbar candidateForReward={false}></Ticket_Topbar>
        </div>
        <div>
          <SvgIconRing number_notifications={0}/>
        </div>
      </>
      )
    }
    return (
      <>
      <div>
        <Ticket_Topbar candidateForReward={notiInfo.candidateForReward}></Ticket_Topbar>
      </div>
      <div>
        <button 
          className={`Button ${notiInfo.need_notify ? 'notify-active' : ''}`} 
          onClick={() => {
            setShowList(!showList);
            if (isOpened === false) {
              setIsOpened(true)
            } else {
              setIsOpened(false)
            }
          }
        }
        >
        <SvgIconRing number_notifications={notiInfo.number_notifications}/>
        </button>
        {showList && (
          <div className={`alarm-list ${showList ? "show" : ""}`} ref={listRef}>
            {notiInfo.notificationList.length > 0 ? (
              <ul className="ul_no_bullet" style={{ padding: "10px", margin: "0" }}>
                {notiInfo.notificationList.map((notification, index) => (
                  <li key={index} style={{ color: notification.notified ? "grey" : "black", }}>
                    <div className='row' id={(index != 0) ? "alarm_greed_style" : "alarm_greed_style_first"}>
                      <div className='col-1' id="alarm_logo" style={{paddingRight : "30px"}}>
                        <SvgIcon/>
                      </div>
                      <div className='col' id="alarm_comment">
                        {notification.type === "now_no_reward" ? "과제 통과를 축하드립니다! 최고의 평가자를 투표하고 이번 시즌 보상에 응모하세요!" : 
                        notification.type === "now_reward_candidate" ? "이번 시즌 보상 응모권이 활성화되었습니다!" :
                        "42서울 카뎃중 한 명이 " + notiInfo.receiver + "님을 최고의 평가자로 투표했습니다!"}
                      </div>
                    <div className='row'>
                      <div id="alarm_time">
                        {notiInfo.notificationList[index].createdAt}
                      </div>
                    </div>
                      </div>
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
      </>
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
    <div style={{paddingLeft: "0px", marginLeft: "-9px"}}>
      <button className="Button" onClick={handleClick} style={{marginLeft:'15px', marginRight:'15px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-square-fill" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
      </button>
      <div id="info_modal">
        <Modal show={isModalOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title><h4><strong>man 42TAPE</strong></h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5><strong>Description</strong></h5>
            <p>
              &nbsp;TAPE&nbsp;는 <strong>&nbsp;The Art of Peer-Evaluation&nbsp;</strong>의 약자로 Intra 나침반의 동료평가 문서를 참고하여 만든 서비스입니다.
              <br></br>
              &nbsp;우리의 목표는 단순한 포인트 획득이나 과제 통과가 아닌 <strong>양질의 평가 문화를 만드는 것입니다.</strong>
              <br></br>
              &nbsp;과제와 일상생활에 바쁜 사람들도 부담 없이 참여할 수 있도록 가이드라인을 제공하고 잘 수행한 분들에게는 <strong>리워드를 제공하여 평가 문화를 지속하려고 합니다.</strong>
            </p>
            <h5><strong>How to use</strong></h5>
            <ol>
              <li>좌측 메뉴에서 Vote 클릭</li>
              <li>투표할 과제 선택
                <br></br>
                  <span style={{fontSize:'13px'}}>※ 과제명 좌측에 <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 8.4375C0 6.8842 1.2592 5.625 2.8125 5.625H27.1875C28.7408 5.625 30 6.8842 30 8.4375V11.25C30 11.7678 29.5803 12.1875 29.0625 12.1875C27.5092 12.1875 26.25 13.4467 26.25 15C26.25 16.5533 27.5092 17.8125 29.0625 17.8125C29.5803 17.8125 30 18.2322 30 18.75V21.5625C30 23.1158 28.7408 24.375 27.1875 24.375H2.8125C1.2592 24.375 0 23.1158 0 21.5625V18.75C0 18.2322 0.419733 17.8125 0.9375 17.8125C2.4908 17.8125 3.75 16.5533 3.75 15C3.75 13.4467 2.4908 12.1875 0.9375 12.1875C0.419733 12.1875 0 11.7678 0 11.25V8.4375ZM7.5 6.5625V8.4375H9.375V6.5625H7.5ZM9.375 12.1875V10.3125H7.5V12.1875H9.375ZM22.5 12.1875V10.3125H20.625V12.1875H22.5ZM20.625 8.4375H22.5V6.5625H20.625V8.4375ZM9.375 14.0625H7.5V15.9375H9.375V14.0625ZM22.5 15.9375V14.0625H20.625V15.9375H22.5ZM9.375 17.8125H7.5V19.6875H9.375V17.8125ZM22.5 19.6875V17.8125H20.625V19.6875H22.5ZM7.5 21.5625V23.4375H9.375V21.5625H7.5ZM20.625 23.4375H22.5V21.5625H20.625V23.4375Z" fill="#EBC705"/>
                    </svg> 표시가 있는 과제는 응모권 제공
                  </span>
                </li>
              <li>과제를 통과할 때까지 만난 모든 평가자들 중 높은 평가 퀄리티로 도움이 되었던 평가자 선택
                <br></br>
                <span style={{fontSize:'13px'}}>※ 평가자 수에 따라 투표개수가 달라짐</span>
              </li>
              <li>선택한 평가자들 중 5개의 설문 항목에 적합하다고 생각되는 평가자 선택
                <br></br>
                <span style={{fontSize:'13px'}}>※ <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
                  </svg> 툴팁에서 각 설문 항목에 대한 자세한 내용 확인 가능
                </span>
              </li>
              <li>응모권이 제공된 과제를 진행했다면 우측상단의 응모권 활성화 확인</li>
              <li>2주 간격으로 랭킹이 갱신될 때마다 보상 획득 여부 확인 &#127873;</li>
            </ol>
            <h5><strong>Contact us</strong></h5>
            <ul>
              <li><a href="mailto:fortytwo.tape@gmail.com">fortytwo.tape@gmail.com</a></li>
            </ul>
          </Modal.Body>
        </Modal>
      </div>
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
        <div className="col-2 d-flex justify-content-around align-items-center" style={{width: '190px'}}>
          <Tools></Tools>
        </div>
      </div>
    )
  }


