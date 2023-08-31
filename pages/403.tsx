import { NextPage } from "next";
import Link from "next/link";
import React from "react";
const Custom403: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl">403 - Unauthorized</h1>
            <p className="">Please login as admin</p>
          </div>
          <Link className="btn btn-primary" href="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom403;
















///////////



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// // ... 기존 코드 ...

// export function RankLayout({ rand_data }: RankInfoProps) {
//   const [currentSeason, setCurrentSeason] = useState(rand_data[0].season_id);
//   // ... 기타 state 및 변수 ...

//   // 서버로부터 데이터를 가져오는 함수
//   const fetchData = async (seasonId: number) => {
//     try {
//       const response = await axios.get(`/api/your_endpoint?season=${seasonId}`);
//       // response.data를 적절하게 처리하여 state를 업데이트
//     } catch (error) {
//       console.error('There was an error fetching the data', error);
//     }
//   };

//   // 버튼 클릭시 데이터 가져오기
//   const handlePreviousSeason = () => {
//     const newSeason = currentSeason - 1;
//     setCurrentSeason(newSeason);
//     fetchData(newSeason);
//   };

//   const handleNextSeason = () => {
//     const newSeason = currentSeason + 1;
//     setCurrentSeason(newSeason);
//     fetchData(newSeason);
//   };

//   // ... 기존 코드 ...

//   return (
//     <div className="row" style={{ margin: '0px' }}>
//       {currentSeason > 1 && (
//         <button onClick={handlePreviousSeason}>Season Previous</button>
//       )}

//       {pageSeason < currentSeason && (
//         <button onClick={handleNextSeason}>Season Next</button>
//       )}

//       {/* ... 기존 코드 ... */}
//     </div>
//   );
// }
