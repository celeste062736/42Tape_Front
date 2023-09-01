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

export interface SeasonInfo {
  currentSeason: IndividualSeason;
  pageSeason: IndividualSeason
}

export interface IndividualRank {
    intra_id: string;
    intra_picture: string;
    rank: number;
    season_id: number;
    start_at : string;
    end_at : string;
}

export type RankItemProps = {
    userDetails: IndividualRank
};
  
  export function Rank({ userDetails }: RankItemProps) {
    let content;
    // console.log("userDetails")
    // console.log(userDetails);
    if (userDetails.rank === 1) {
      content = <div className="card_123" id="card_1st">
        <div className="centered-container">
          <div>
            <span className="bold_text">Rank </span>
            <span>#{userDetails.rank}</span>
          </div>
          <img className="rank_picture_1 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
          <div>
            <p>{userDetails.intra_id}</p>
          </div>
        </div>
      </div>;
    } else if (userDetails.rank === 2 || userDetails.rank === 3) {
      content = <div className="card_123" id="card_2nd_3rd">
        <div className="centered-container">
          <div>
            <span className='bold_text'>Rank </span>
            <span>#{userDetails.rank}</span>
          </div>
          <img className="rank_picture_2_3 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
          <div>
            <p>{userDetails.intra_id}</p>
          </div>
        </div>
      </div>
    } else if (userDetails.rank >= 4) {
      content = <div className="card_4" id="card_4th">
        <div className="left-section">
          <img className="rank_picture_4 rounded-circle" src={userDetails.intra_picture} alt="intra picture" />
          <span>{userDetails.intra_id}</span>
        </div>
        <div className="right-section">
          <span className="bold_text">Rank </span>
          <span className="space">#{userDetails.rank}</span>
        </div>
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

export type RankInfo = IndividualRank[];

export interface RankLayoutProps {
  rand_data: RankInfo;
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

  return (
    <div className="row" style={{margin: '0px'}}>
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
          {pageSeason > 1 && (
          <button id="rank_page_index_button" onClick={() => {
            setPageSeason(pageSeason - 1);
            router.push(`/rank/${pageSeason - 1}`); // 페이지 라우팅
          }}>
            Season Previous
          </button>       
          )}
            {pageSeason < currentSeason && (
            <button id="rank_page_index_button" onClick={() => {
              setPageSeason(pageSeason + 1);
              router.push(`/rank/${pageSeason + 1}`); // 페이지 라우팅
            }}>
              Season Next
            </button>
          )}
        </div>

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
        {/* 시즌 정보 코드 ... */}
        <div className="row d-flex align-items-center justify-content-center" style={{position: 'relative', padding: '0px',height: '100px', marginLeft: '90px'}}onMouseEnter={() => setShowSeasonInfo(true)}  // 마우스를 올렸을 때
               onMouseLeave={() => setShowSeasonInfo(false)} // 마우스를 내렸을 때
          >
            
        <span style={{
                    fontSize: '30px', 
                    fontWeight: 'bold', 
                    color: '#4CAF50'
                  }}>Season {pageSeason}</span>
                {showSeasonInfo && (
              <div style={{
                position: 'absolute',
                top: '55%', 
                left: '1%',
                backgroundColor: 'rgba(128, 128, 128, 0.8)', // 투명한 회색
                color: 'white', // 텍스트를 흰색으로
                border: 'none',
                padding: '5px',
                borderRadius: '12px', // 모서리 라운드 설정
                zIndex: 1000,
                width: '210px',
                textAlign: 'center', // 텍스트를 중앙에 배치
                  }}
              >
                  {formatDate(SeasonInfo.pageSeason.start_at)} ~ {formatDate(SeasonInfo.pageSeason.end_at)}
              </div>
            )}
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
            <button className="pretty-button" id="rank_page_index_button" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>Previous</button>
            <button className="pretty-button" id="rank_page_index_button" onClick={() => setCurrentPage(currentPage < Math.ceil(rand_data.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <Copyright></Copyright>
          </div>
          <Blank name="main"></Blank>
        </div>
        {/* ... */}
      </div>
    </div>
  )
}

































// "use client"
// import { Copyright } from './Components';
// import { Button } from './button';
// import { Blank } from './blank';
// import React, { useState } from 'react';

// export interface IndividualRank {
//     intra_id: string;
//     intra_picture: string;
//     rank: number;
//     season_id: number;
//     start_at : string;
//     end_at : string;
// }

// type RankItemProps = {
//     userDetails: IndividualRank
//   };
  
//   export function Rank({ userDetails }: RankItemProps) {
//     let content;
//     // console.log("userDetails")
//     // console.log(userDetails);
//     if (userDetails.rank === 1) {
//       content = <div className="card_123" id="card_1st">
//         <div className="centered-container">
//           <div>
//             <span className="bold_text">Rank </span>
//             <span>#{userDetails.rank}</span>
//           </div>
//           <img className="rank_picture_1 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
//           <div>
//             <p>{userDetails.intra_id}</p>
//           </div>
//         </div>
//       </div>;
//     } else if (userDetails.rank === 2 || userDetails.rank === 3) {
//       content = <div className="card_123" id="card_2nd_3rd">
//         <div className="centered-container">
//           <div>
//             <span className='bold_text'>Rank </span>
//             <span>#{userDetails.rank}</span>
//           </div>
//           <img className="rank_picture_2_3 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
//           <div>
//             <p>{userDetails.intra_id}</p>
//           </div>
//         </div>
//       </div>
//     } else if (userDetails.rank >= 4) {
//       content = <div className="card_4" id="card_4th">
//         <div className="left-section">
//           <img className="rank_picture_4 rounded-circle" src={userDetails.intra_picture} alt="intra picture" />
//           <span>{userDetails.intra_id}</span>
//         </div>
//         <div className="right-section">
//           <span className="bold_text">Rank </span>
//           <span className="space">#{userDetails.rank}</span>
//         </div>
//       </div>
//     } else {
//       content = null; // 위의 조건 중 어떤 것도 만족하지 않을 때 반환할 내용
//     }
//     return content;
//   }
  

// export interface DataPoint {
//   x: number;
//   y: number;
// }

// export type RankInfo = IndividualRank[];

// interface RankInfoProps {
//   rand_data: RankInfo;
// }

// export function RankLayout({rand_data}: RankInfoProps) {
//   const [currentSeason, setCurrentSeason] = useState(rand_data[0].season_id); // 현재 시즌
//   const [pageSeason, setPageSeason] = useState(rand_data[0].season_id); // 현재 시즌
//   const [showSeasonInfo, setShowSeasonInfo] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//   const itemsPerPage = 30; // 페이지 당 아이템 개수
//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;
//   // const currentItems = rand_data.slice(firstIndex, lastIndex); // 현재 페이지에 표시될 랭킹 데이터
//   const currentItems = currentPage === 1 ? 
//   rand_data.slice(3, lastIndex) : 
//   rand_data.slice(firstIndex, lastIndex);
  
//   return (
//     <div className="row" style={{margin: '0px'}}>

//       {/* Season Previous 버튼 */}
//       {currentSeason > 1 && (
//         <button onClick={() => setCurrentSeason(currentSeason - 1)}>Season Previous</button>
//       )}

//       {/* Season Next 버튼 */}
//       {pageSeason < currentSeason && (
//       <button onClick={() => setCurrentSeason(currentSeason + 1)}>Season Next</button>
//       )}

//       {/* ... 기존의 시즌 정보 코드 ... */}
//       <div className="col-2 d-none d-xl-block">
//         <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
//           <Button name="vote"></Button>
//         </div>
//         <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
//           <Button name="rank"></Button>
//         </div>
//       </div>
//       <div className="col">
//         {/* 시즌 정보 코드 ... */}
//         <div className="row d-flex align-items-center justify-content-center" style={{position: 'relative', padding: '0px',height: '100px', marginLeft: '90px'}}onMouseEnter={() => setShowSeasonInfo(true)}  // 마우스를 올렸을 때
//                onMouseLeave={() => setShowSeasonInfo(false)} // 마우스를 내렸을 때
//           >




//         <span style={{
//                     fontSize: '30px', 
//                     fontWeight: 'bold', 
//                     color: '#4CAF50'
//                   }}>Season {rand_data[0].season_id}</span>
//                 {showSeasonInfo && (
//               <div style={{
//                 position: 'absolute',
//                 top: '55%', 
//                 left: '1%',
//                 backgroundColor: 'rgba(128, 128, 128, 0.8)', // 투명한 회색
//                 color: 'white', // 텍스트를 흰색으로
//                 border: 'none',
//                 padding: '5px',
//                 borderRadius: '12px', // 모서리 라운드 설정
//                 zIndex: 1000,
//                 width: '210px',
//                 textAlign: 'center', // 텍스트를 중앙에 배치
//                   }}
//               >
//               2023-10-11 ~ 2023-10-30
//               </div>
//             )}
//         </div>
//         {/* 첫번째 페이지인 경우에만 1,2,3등을 따로 표시 */}
//         {currentPage === 1 && (
//           <div className="row">
//             {/* ... 1, 2, 3등을 표시하는 코드 ... */}
//             <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
//             <Rank userDetails={rand_data[1]}></Rank>
//           </div>
//           <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
//             <Rank userDetails={rand_data[0]}></Rank>
//           </div>
//           <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
//             <Rank userDetails={rand_data[2]}></Rank>
//           </div>
//           <div className="col-2 d-none d-xl-block"></div>
//           </div>
//         )}
//         {/* 일반 랭킹 표시 */}
//         <div className="row">
//           {currentItems.map((rank, index) => (
//             <div key={index} className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
//               <Rank userDetails={rank}></Rank>
//               <Blank name="main"></Blank>
//             </div>
//           ))}
//         </div>
//         {/* 페이지네이션 */}
//         <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
//         <button className="pretty-button" id="rank_page_index_button" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>Previous</button>
//         <button className="pretty-button" id="rank_page_index_button" onClick={() => setCurrentPage(currentPage < Math.ceil(rand_data.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
//         </div>
//         <div className="row">
//           <div className="col-xl-10 d-flex justify-content-center align-items-center">
//             <Copyright></Copyright>
//           </div>
//           <Blank name="main"></Blank>
//         </div>
//         {/* ... */}
//       </div>
//     </div>
//   )
// }
