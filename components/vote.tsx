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
};

interface VoteListInfoProps {
    vote_data: VoteListInfo[];
};

export function VoteLayout({vote_data}: VoteListInfoProps) {
  const router = useRouter();
    return (
      <div className="row" style={{margin: '0px'}}>
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
            <div id="vote_main_description" className="col-xl-10 d-flex align-items-center justify-content-center">
              평가자 투표를 진행할 과제를 하나 선택하세요.
            </div>
          </div>
          <div className="row" style={{margin: '15px'}}>
            <div id="vote_sub_description" className="col-xl-10 d-flex align-items-center justify-content-center">
              ※ 투표 대상은 과제를 통과할 때까지 만난 모든 평가자들입니다.
            </div>
          </div>
            {vote_data.map((item, index) => (
                <div key={index} className="row">
                    <div key={index} className="col-xl-10 d-flex align-items-center justify-content-center">
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
            <div className="row">
                <div className="col-xl-10 d-flex justify-content-center align-items-center">
                    <Copyright></Copyright>
                </div>
            </div>
        </div>
      </div>
    )
  }