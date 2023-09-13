import { Button } from './button';
import { Copyright } from './Components';
import { season_reward_record } from '../pages/admin';
import { useState } from 'react';


interface seasonRewardRecordLists {
  reward_data: season_reward_record[];
};

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange } : PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
          <button onClick={() => onPageChange(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function AdminLayout({ reward_data }: seasonRewardRecordLists) {
  const rewardsPerPage = 5; // 한 페이지에 보여줄 보상 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // 페이지 변경 함수
  const handlePageChange = (pageNumber : number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지의 season_item 데이터 계산
  const indexOfLastSeason = currentPage * rewardsPerPage;
  const indexOfFirstSeason = indexOfLastSeason - rewardsPerPage;
  const currentSeasons = reward_data.slice(indexOfFirstSeason, indexOfLastSeason);

    return (
      <div className="row" style={{ margin: '0px' }}>
        <div className="col-2 d-none d-xl-block">
          <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
            <Button name="vote"></Button>
          </div>
          <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
            <Button name="rank"></Button>
          </div>
          <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
            <Button name="reward"></Button>
          </div>
        </div>
        <div className="col">
          {currentSeasons.map((season_item, season_index) => (
            <div className="row">
              <div key={season_index} className="col-xl d-flex align-items-center justify-content-left">
                <div>
                  <div>{season_item.season_id}</div>
                  <div>{season_item.start_at}</div>
                  <div>{season_item.end_at}</div>
                  <div>{season_item.reward_end_at}</div>
                </div>
              </div>
              <div className="row">
                {season_item.reward_list.map((reward_item, reward_index) => (
                  <div key={reward_index} className="col-xl d-flex align-items-center justify-content-left">
                    <div>
                      <div>{reward_item.user_id}</div>
                      <div>{reward_item.login}</div>
                      <div>{reward_item.email}</div>
                      <div>{reward_item.reward}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* 페이지네이션 컴포넌트 추가 */}
          <Pagination
            itemsPerPage={rewardsPerPage}
            totalItems={reward_data.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="row" style={{margin: '0px'}}>
            <div className="col-xl-12 d-flex justify-content-center align-items-center">
              <Copyright />
            </div>
          </div>
      </div>
    )
  }
  