import { Copyright } from './Components';
import { Button } from './button';
import { Blank } from './blank';
import Link from 'next/link'

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
            {vote_data.map((item, index) => (
                <div className="row">
                    <div key={index} className="col-xl-10 d-flex align-items-center justify-content-center">
                        <button id="project_selector" className="btn btn-primary">
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