import { TopBar } from '../components/topbar'
import { RankLayout } from '../components/rank'
import type { GetServerSideProps } from 'next'
import type { Season } from '../components/Components'
import { getToken } from "next-auth/jwt"
import type { IndividualRank } from '../components/rank'

export interface TapeUser {
    user_id: number;
    number_votes: number;
    need_vote: boolean;
    number_notifications: number;
    need_notify: boolean;
    candidate_for_reward: boolean;
    is_activated: boolean;
    createdAt: string;
    updatedAt: string;
}
  
export interface RankListEntry {
  rank: number;
  ranker_user_id: number;
  login: string;
  intra_picture: string;
  candidate: boolean;
  first_name: string;
  last_name: string;
  intra_level: number;
  cumulative_total_score: number;
  cumulative_stat1: number;
  cumulative_stat2: number;
  cumulative_stat3: number;
  cumulative_stat4: number;
  cumulative_stat5: number;
}
  
export interface RankInfo_DB {
  tape_user: TapeUser;
  pageSeason: Season;
  currentSeason: Season;
  rankList: RankListEntry[];
}

export interface RankInfo {
  rank_1: IndividualRank;
  rank_2: IndividualRank;
  rank_3: IndividualRank;
  rank_4: IndividualRank;
  rank_5: IndividualRank;
  rank_6: IndividualRank;
}
  
export const getServerSideProps: GetServerSideProps<{
    rank_info: RankInfo
  }> = async ({ req, res }) => {
    const dataUnknown : RankInfo = {
        rank_1: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        },
        rank_2: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        },
        rank_3: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        },
        rank_4: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        },
        rank_5: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        },
        rank_6: {
            intra_id: "unknown",
            intra_picture: "unknown",
            rank: 0,
        }
    }
    const token = await getToken({req})
    if (!token) {
      return { props : { rank_info: dataUnknown }}
    }

    //userId,headers type 오류 index.tsx에서 했던 방식으로 수정하면 될것임.
    let userId = token.sub;
    const resp = await fetch('http://localhost:8080/ranking/1', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const RankInfo_db : RankInfo_DB = await resp.json()
    console.log('token');
    console.log(token);
    console.log('rank resp');
    console.log(RankInfo_db);
    console.log('rank resp');
    const data : RankInfo = {
            rank_1: {
                intra_id: RankInfo_db.rankList[0].login,
                intra_picture: RankInfo_db.rankList[0].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[0].rank,
            },
            rank_2: {
                intra_id: RankInfo_db.rankList[1].login,
                intra_picture: RankInfo_db.rankList[1].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[1].rank,
            },
            rank_3: {
                intra_id: RankInfo_db.rankList[2].login,
                intra_picture: RankInfo_db.rankList[2].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[2].rank,
            },
            rank_4: {
                intra_id: RankInfo_db.rankList[3].login,
                intra_picture: RankInfo_db.rankList[3].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[3].rank,
            },
            rank_5: {
                intra_id: RankInfo_db.rankList[4].login,
                intra_picture: RankInfo_db.rankList[4].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[4].rank,
            },
            rank_6: {
                intra_id: RankInfo_db.rankList[5].login,
                intra_picture: RankInfo_db.rankList[5].intra_picture || "./default-profile.png",
                rank: RankInfo_db.rankList[5].rank,
            }
        }
    console.log('data----------1');
    console.log(data);
    console.log('data-----------2');
    return { props: { rank_info : data}}
}

interface RankProps {
  rank_info: RankInfo,
}

export default function Rank(props: RankProps) {
    return (
        <div id="root">
            <TopBar></TopBar>
            <RankLayout rand_data={props.rank_info}></RankLayout>
        </div>
    );
}
