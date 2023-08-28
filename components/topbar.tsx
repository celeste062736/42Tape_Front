"use client"
import React, { useEffect, useRef, useState } from 'react';
import { LogoImg, LogoName } from './logo';
import { Button } from './button';
import { Blank } from './blank';
import { LogoutButton } from './logout';

export default function ListButton() {
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
      <div className="input-group">
        <input id="searchSpace" type="text" className="form-control" placeholder="Search"></input>
        <button id="searchButton" className="Button">
          <svg width="30" height="30" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.0693 14.6968C27.0693 22.0257 21.3055 27.8936 14.2847 27.8936C7.26382 27.8936 1.5 22.0257 1.5 14.6968C1.5 7.3679 7.26382 1.5 14.2847 1.5C21.3055 1.5 27.0693 7.3679 27.0693 14.6968Z" stroke="#6181ff" strokeWidth="3"/>
            <line x1="24.1149" y1="24.9966" x2="33.1149" y2="34.9966" stroke="#6181ff" strokeWidth="3"/>
          </svg>
        </button>
      </div>
    )
  }
  
  export function Alarm() {
    const [showList, setShowList] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
  
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
        <button className="Button" onClick={() => setShowList(!showList)}>
          <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 50C28.4518 50 31.25 47.2018 31.25 43.75H18.75C18.75 47.2018 21.5482 50 25 50Z" fill="#6181ff"/>
            <path d="M25 5.99453L22.5088 6.49766C16.7985 7.6509 12.5001 12.702 12.5001 18.75C12.5001 20.712 12.0802 25.6164 11.0661 30.4443C10.5627 32.8409 9.88919 35.3363 8.99404 37.5H41.006C40.1108 35.3363 39.4373 32.8409 38.934 30.4442C37.9199 25.6164 37.5001 20.7119 37.5001 18.75C37.5001 12.7019 33.2016 7.65084 27.4913 6.49764L25 5.99453ZM44.4353 37.5C45.133 38.8981 45.9421 40.0031 46.875 40.625H3.125C4.0579 40.0031 4.86702 38.8981 5.56469 37.5C8.37257 31.873 9.37507 21.4974 9.37507 18.75C9.37507 11.1854 14.7506 4.8764 21.8901 3.43451C21.8801 3.33269 21.875 3.22944 21.875 3.125C21.875 1.39911 23.2741 0 25 0C26.7259 0 28.125 1.39911 28.125 3.125C28.125 3.22944 28.1199 3.33267 28.1099 3.43448C35.2494 4.87632 40.6251 11.1854 40.6251 18.75C40.6251 21.4974 41.6275 31.873 44.4353 37.5Z" fill="#6181ff"/>
          </svg>
        </button>
        {showList && (
          <div className="alarm-list" ref={listRef}>
            <ul style={{padding: '10px', margin: '0'}}>
              <li>누군가 당신을 최고의 평가자로 투표했습니다!</li>
              <br></br>
              <li>누군가 당신을 최고의 평가자로 투표했습니다!</li>
            </ul>
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
          <svg width="30" height="30" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.89062 25.9602V25.6364C7.91335 23.5227 8.12358 21.8409 8.52131 20.5909C8.9304 19.3409 9.50994 18.3295 10.2599 17.5568C11.0099 16.7841 11.9134 16.0795 12.9702 15.4432C13.652 15.0114 14.2656 14.5284 14.8111 13.9943C15.3565 13.4602 15.7884 12.8466 16.1065 12.1534C16.4247 11.4602 16.5838 10.6932 16.5838 9.85227C16.5838 8.84091 16.3452 7.96591 15.8679 7.22727C15.3906 6.48864 14.7543 5.92045 13.9588 5.52273C13.1747 5.11364 12.2997 4.90909 11.3338 4.90909C10.4588 4.90909 9.62358 5.09091 8.82812 5.45455C8.03267 5.81818 7.37358 6.38636 6.85085 7.15909C6.32813 7.92045 6.02699 8.90341 5.94744 10.108H0.765625C0.84517 8.0625 1.36222 6.33523 2.31676 4.92614C3.27131 3.50568 4.53267 2.43182 6.10085 1.70454C7.6804 0.977271 9.42472 0.613635 11.3338 0.613635C13.4247 0.613635 15.2543 1.00568 16.8224 1.78977C18.3906 2.5625 19.6065 3.64773 20.4702 5.04545C21.3452 6.43182 21.7827 8.05114 21.7827 9.90341C21.7827 11.1761 21.5838 12.3239 21.1861 13.3466C20.7884 14.358 20.2202 15.2614 19.4815 16.0568C18.7543 16.8523 17.8793 17.5568 16.8565 18.1705C15.8906 18.7727 15.1065 19.3977 14.5043 20.0455C13.9134 20.6932 13.4815 21.4602 13.2088 22.3466C12.9361 23.233 12.7884 24.3295 12.7656 25.6364V25.9602H7.89062ZM10.4645 36.3239C9.53267 36.3239 8.73153 35.9943 8.06108 35.3352C7.39063 34.6648 7.0554 33.858 7.0554 32.9148C7.0554 31.983 7.39063 31.1875 8.06108 30.5284C8.73153 29.858 9.53267 29.5227 10.4645 29.5227C11.3849 29.5227 12.1804 29.858 12.8509 30.5284C13.5327 31.1875 13.8736 31.983 13.8736 32.9148C13.8736 33.5398 13.7145 34.1136 13.3963 34.6364C13.0895 35.1477 12.6804 35.5568 12.169 35.8636C11.6577 36.1705 11.0895 36.3239 10.4645 36.3239Z" fill="#6181ff"/>
          </svg>
        </button>
        {isModalOpen && (
          <div className="overlay" onClick={closeModal}>
            <img src="./guide.png" alt="info-image" className="info-image" />
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