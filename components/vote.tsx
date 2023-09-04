import { Copyright } from './Components';
import { Button } from './button';
import { Blank } from './blank';
import Link from 'next/link'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

type VoteListInfo = {
    vote_id: number;
    project_name: string;
    season_id: number;
    filled_at: string;
    candidate_for_reward: boolean;
};

interface VoteListInfoProps {
    vote_data: VoteListInfo[];
};

export const TicketSvgIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8.4375C0 6.8842 1.2592 5.625 2.8125 5.625H27.1875C28.7408 5.625 30 6.8842 30 8.4375V11.25C30 11.7678 29.5803 12.1875 29.0625 12.1875C27.5092 12.1875 26.25 13.4467 26.25 15C26.25 16.5533 27.5092 17.8125 29.0625 17.8125C29.5803 17.8125 30 18.2322 30 18.75V21.5625C30 23.1158 28.7408 24.375 27.1875 24.375H2.8125C1.2592 24.375 0 23.1158 0 21.5625V18.75C0 18.2322 0.419733 17.8125 0.9375 17.8125C2.4908 17.8125 3.75 16.5533 3.75 15C3.75 13.4467 2.4908 12.1875 0.9375 12.1875C0.419733 12.1875 0 11.7678 0 11.25V8.4375ZM7.5 6.5625V8.4375H9.375V6.5625H7.5ZM9.375 12.1875V10.3125H7.5V12.1875H9.375ZM22.5 12.1875V10.3125H20.625V12.1875H22.5ZM20.625 8.4375H22.5V6.5625H20.625V8.4375ZM9.375 14.0625H7.5V15.9375H9.375V14.0625ZM22.5 15.9375V14.0625H20.625V15.9375H22.5ZM9.375 17.8125H7.5V19.6875H9.375V17.8125ZM22.5 19.6875V17.8125H20.625V19.6875H22.5ZM7.5 21.5625V23.4375H9.375V21.5625H7.5ZM20.625 23.4375H22.5V21.5625H20.625V23.4375Z" fill="#EBC705">
      <animate attributeName="fill" values="#EBC705; #FFF9DC; #EBC705" dur="1s" repeatCount="indefinite" />
    </path>
  </svg>
);


// export const TicketSvgIcon = () => (
//   <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M0 8.4375C0 6.8842 1.2592 5.625 2.8125 5.625H27.1875C28.7408 5.625 30 6.8842 30 8.4375V11.25C30 11.7678 29.5803 12.1875 29.0625 12.1875C27.5092 12.1875 26.25 13.4467 26.25 15C26.25 16.5533 27.5092 17.8125 29.0625 17.8125C29.5803 17.8125 30 18.2322 30 18.75V21.5625C30 23.1158 28.7408 24.375 27.1875 24.375H2.8125C1.2592 24.375 0 23.1158 0 21.5625V18.75C0 18.2322 0.419733 17.8125 0.9375 17.8125C2.4908 17.8125 3.75 16.5533 3.75 15C3.75 13.4467 2.4908 12.1875 0.9375 12.1875C0.419733 12.1875 0 11.7678 0 11.25V8.4375ZM7.5 6.5625V8.4375H9.375V6.5625H7.5ZM9.375 12.1875V10.3125H7.5V12.1875H9.375ZM22.5 12.1875V10.3125H20.625V12.1875H22.5ZM20.625 8.4375H22.5V6.5625H20.625V8.4375ZM9.375 14.0625H7.5V15.9375H9.375V14.0625ZM22.5 15.9375V14.0625H20.625V15.9375H22.5ZM9.375 17.8125H7.5V19.6875H9.375V17.8125ZM22.5 19.6875V17.8125H20.625V19.6875H22.5ZM7.5 21.5625V23.4375H9.375V21.5625H7.5ZM20.625 23.4375H22.5V21.5625H20.625V23.4375Z" fill="#EBC705"/>
//   </svg>
// );

export function VoteLayout({vote_data}: VoteListInfoProps) {
  const router = useRouter();
  // console.log('---------------------3--------------------vote_data');
  // console.log(vote_data[0]);
    return (
      <div className="row" style={{margin: '0px'}}>
        <div className="col-2 d-none d-xl-block">
          <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
            <Button name="vote"></Button>
          </div>
          <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
            <Button name="rank"></Button>
          </div>
          <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
            <Button name="reward"></Button>
          </div>
        </div>
  
        <div className="col">
          <div className="row">
            <div id="vote_main_description" className="col-xl-10 d-flex align-items-center justify-content-center">
              평가자 투표를 진행할 과제를 하나 선택하세요.
            </div>
          </div>
          <div className="row" style={{margin: '15px'}}>
            <div id="vote_sub_description" className="col-xl-10 d-flex align-items-center justify-content-center">
              ※ 투표 대상은 과제를 통과할 때까지 만난 모든 평가자들입니다.
            </div>
          </div>

            <div className="row">
              <div className='col-xs-1 col-3'>
              </div>
              <div className='col-xs-10 col-6'>
                {vote_data.map((item, index) => (
                    <div key={index} className="row">
                        <div key={index} className="col-xl-10 d-flex align-items-center justify-content-left">
                            {(index === 0 && (vote_data[0].candidate_for_reward === false)) ? <TicketSvgIcon/> : <div></div>}
                            <div id="season_display">
                              Season {item.season_id}
                            </div>
                            <button id="project_selector" className="btn btn-primary" onClick={(e) => {
                              router.push(`/vote/${item.vote_id}`)
                            }}>
                              {item.project_name} 평가자 투표
                            </button>
                        </div>
                    </div>
                ))}
              </div>
              <div className='col-xs-1 col-3'>
              </div>
            </div>
            <div className="row">
                <div className="col-xl-10 d-flex justify-content-center align-items-center">
                    <Copyright></Copyright>
                </div>
            </div>
        </div>
      </div>
    )
  }