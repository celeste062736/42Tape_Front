import { Copyright } from './Components';
import { Button } from './button';
import { Blank } from './blank';
import Link from 'next/link'

export interface IndividualRank {
    intra_id: string;
    intra_picture: string;
    rank: number;
  }

type RankItemProps = {
    userDetails: IndividualRank
  };
  
  export function Rank({ userDetails }: RankItemProps) {
    let content;
    console.log("userDetails")
    console.log(userDetails);
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

type RankInfo = {
  rank_1: IndividualRank; 
  rank_2: IndividualRank; 
  rank_3: IndividualRank; 
  rank_4: IndividualRank; 
  rank_5: IndividualRank; 
  rank_6: IndividualRank; 
};

interface RankInfoProps {
  rand_data: RankInfo;
}

export function RankLayout({rand_data}: RankInfoProps) {
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
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_2}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_1}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_3}></Rank>
          </div>
          <div className="col-2 d-none d-xl-block"></div>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_4}></Rank>
          </div>
          <Blank name="main"></Blank>
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_5}></Rank>
          </div>
          <Blank name="main"></Blank>
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={rand_data.rank_6}></Rank>
          </div>
          <Blank name="main"></Blank>
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