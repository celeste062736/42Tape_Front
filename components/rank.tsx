"use client"
import { Copyright } from './Components';
import { Button } from './button';
import { Blank } from './blank';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export interface IndividualSeason {
  season_id: number;
  start_at: string;
  end_at: string;
}

export interface RankInfo {
  intra_id: string;
  user_id: number;
  intra_picture: string;
  rank: number;
  season_id: number;
  start_at: string;
  end_at: string;
}

export interface SeasonInfo {
  currentSeason: IndividualSeason;
  pageSeason: IndividualSeason
}

export type RankItemProps = {
    userDetails: RankInfo
};
  
  export function Rank({ userDetails }: {userDetails: RankInfo}) {
    let content;
    const router = useRouter();
    // console.log("userDetails")
    // console.log(userDetails);
    if (userDetails.rank === 1) {
      content =
      <div className="card_123" id="card_1st">
        <button onClick={()=>{
          router.push(`/users/${userDetails.user_id}`)
        }}>
        <div className="centered-container">
          <div style={{marginBottom:'5px'}}>
            <span className="bold_text">Rank</span>
            <span>#{userDetails.rank}</span>
          </div>
          <img className="rank_picture_1 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
          <div>
            <p>{userDetails.intra_id}</p>
          </div>
        </div>
      </button>
      </div>
    } else if (userDetails.rank === 2 || userDetails.rank === 3) {
      content = 
      <div className="card_123" id="card_2nd_3rd">
        <button onClick={()=>{
          router.push(`/users/${userDetails.user_id}`)
        }}>
        <div className="centered-container">
          <div style={{marginBottom:'2px'}}>
            <span className='bold_text'>Rank </span>
            <span>#{userDetails.rank}</span>
          </div>
          <img className="rank_picture_2_3 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
          <div>
            <p>{userDetails.intra_id}</p>
          </div>
        </div>
        </button>
      </div>
    } else if (userDetails.rank >= 4) {
      content =
      <div className="card_4" id="card_4th">
        <button onClick={()=>{
          router.push(`/users/${userDetails.user_id}`)
        }}>
        <div className="left-section">
          <img className="rank_picture_4 rounded-circle" src={userDetails.intra_picture} alt="intra picture" />
          <span>{userDetails.intra_id}</span>
        </div>
        <div className="right-section">
          <span className="bold_text">Rank </span>
          <span className="space">#{userDetails.rank}</span>
        </div>
        </button>
      </div>
    } else {
      content = null; // 위의 조건 중 어떤 것도 만족하지 않을 때 반환할 내용
    }
    return content;
  }
  

export interface DataPoint {
  x: number;
  y: number;
}

export interface RankLayoutProps {
  rand_data: RankInfo[];
  SeasonInfo: SeasonInfo;
}

export function RankLayout(props : {RankLayoutProps: RankLayoutProps}) {
  const rand_data = props.RankLayoutProps.rand_data;
  const SeasonInfo = props.RankLayoutProps.SeasonInfo;
  const router = useRouter();
  const [currentSeason, setCurrentSeason] = useState(SeasonInfo.currentSeason.season_id); // 현재 시즌
  const [pageSeason, setPageSeason] = useState(SeasonInfo.pageSeason.season_id); // 현재 시즌
  const [showSeasonInfo, setShowSeasonInfo] = useState(false); //시즌정보 툴팁
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 30; // 페이지 당 아이템 개수
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  // const currentItems = rand_data.slice(firstIndex, lastIndex); // 현재 페이지에 표시될 랭킹 데이터
  const currentItems = currentPage === 1 ? 
  rand_data.slice(3, lastIndex) : 
  rand_data.slice(firstIndex, lastIndex);

  const formatDate = (isoString:any) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  let description = "투표는 과제를 통과한 날짜를 기준으로 해당 시즌에 반영됩니다. 랭킹은 2주마다 새 시즌이 시작되며, 시즌이 종료된 후 이틀 이내에 제출된 모든 표를 집계하여 보상 대상을 결정합니다. 42TAPE에 최소 한 번 로그인하고, 마지막으로 통과한 과제에 대한 투표를 완료해야만 보상을 받을 수 있습니다. 집계 시점에 이 조건을 만족하는 상위 3명과 무작위로 추첨된 15명에게 리워드를 제공할 예정입니다."

  useEffect(() => {
    const bootstrap = require('bootstrap');  // 클라이언트 사이드에서만 import

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }, []);

  return (
    <div className="row" style={{margin: '0px'}}>
      {/* {pageSeason > 1 && (
        <button onClick={() => {
          setPageSeason(pageSeason - 1);
          router.push(`/rank/${pageSeason - 1}`); // 페이지 라우팅
        }}>
          Season Previous
        </button>       
      )}

      {pageSeason < currentSeason && (
        <button onClick={() => {
          setPageSeason(pageSeason + 1);
          router.push(`/rank/${pageSeason + 1}`); // 페이지 라우팅
        }}>
          Season Next
        </button>
      )} */}

      {/* {currentSeason > 1 && (
        <button onClick={() => setCurrentSeason(currentSeason - 1)}>Season Previous</button>       
      )}

      {pageSeason < currentSeason && (
      <button onClick={() => setCurrentSeason(currentSeason + 1)}>Season Next</button>
      )} */}

      {/* ... 기존의 시즌 정보 코드 ... */}
      <div className="col-2 d-none d-xl-block">
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="vote"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="rank"></Button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="col-xl-10" style={{paddingLeft:'60px', width:'auto'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
              <path data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title={description} d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
            </svg>
          </div>
        </div>
        {/* 시즌 정보 코드 ... */}
        <div className="row">
          <div
            className="col-xl-10" 
            onMouseEnter={() => setShowSeasonInfo(true)}  // 마우스를 올렸을 때
            onMouseLeave={() => setShowSeasonInfo(false)} // 마우스를 내렸을 때
            style={{paddingLeft:'60px', height:'80px', width:'auto'}}
          >
            <span style={{fontSize: '30px', fontWeight: 'bold', color: '#6181ff'}}>
              Season {pageSeason}
            </span>
            {showSeasonInfo && (
              <div 
                style={{
                  backgroundColor: 'rgba(128, 128, 128, 0.8)', // 투명한 회색
                  color: 'white', // 텍스트를 흰색으로
                  border: 'none',
                  padding: '5px',
                  borderRadius: '12px', // 모서리 라운드 설정
                  zIndex: 1000,
                  width: '220px',
                  textAlign: 'center', // 텍스트를 중앙에 배치
                }}
              >
                {formatDate(SeasonInfo.pageSeason.start_at)} ~ {formatDate(SeasonInfo.pageSeason.end_at)}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xl-10" style={{paddingLeft:'50px'}}>
            <button 
              className="rank_page_index_button" 
              disabled={pageSeason <= 1} // pageSeason이 1 이하이면 버튼 비활성화
              onClick={() => {
                if (pageSeason > 1) {
                  setPageSeason(pageSeason - 1);
                  router.push(`/rank/${pageSeason - 1}`); // 페이지 라우팅
                }
              }}
            >
              Season Previous
            </button>

            <button 
              className="rank_page_index_button" 
              disabled={pageSeason >= currentSeason} // pageSeason이 currentSeason 이상이면 버튼 비활성화
              onClick={() => {
                if (pageSeason < currentSeason) {
                  setPageSeason(pageSeason + 1);
                  router.push(`/rank/${pageSeason + 1}`); // 페이지 라우팅
                }
              }}
            >
              Season Next
            </button>
          </div>
        </div>
        {/* 첫번째 페이지인 경우에만 1,2,3등을 따로 표시 */}
        {currentPage === 1 && (
          <div className="row">
            {/* ... 1, 2, 3등을 표시하는 코드 ... */}
            <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data[1]}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data[0]}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data[2]}></Rank>
          </div>
          <div className="col-2 d-none d-xl-block"></div>
          </div>
        )}
        {/* 일반 랭킹 표시 */}
        <div className="row">
          {currentItems.map((rank, index) => (
            <div key={index} className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
              <Rank userDetails={rank}></Rank>
              <Blank name="main"></Blank>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <button className="pretty-button rank_page_index_button" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>Rank Previous</button>
            <button className="pretty-button rank_page_index_button" onClick={() => setCurrentPage(currentPage < Math.ceil(rand_data.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Rank Next</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <Copyright></Copyright>
          </div>
          <Blank name="main"></Blank>
        </div>
      </div>
    </div>
  )
}
