import { RankLayout, TopBar } from '../components/Components'
import type { GetServerSideProps } from 'next'
import type { Season } from '../components/Components'
import { getToken } from "next-auth/jwt"

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

export interface IndividualRank {
  intra_id: string;
  intra_picture: string;
  rank: number;
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
      return { props : dataUnknown }
    }

    //userId,headers type 오류 index.tsx에서 했던 방식으로 수정하면 될것임.
    let userId : string | null;
    if(token.sub === null) {
      userId = null;
    } else {
      userId = token.sub;
    }
    const resp = await fetch('http://10.19.241.225:8080/ranking/1', {
      method: "GET",
      headers: {
        "user-id": userId,
      }
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
                intra_picture: RankInfo_db.rankList[0].intra_picture,
                rank: RankInfo_db.rankList[0].rank,
            },
            rank_2: {
                intra_id: RankInfo_db.rankList[1].login,
                intra_picture: RankInfo_db.rankList[1].intra_picture,
                rank: RankInfo_db.rankList[1].rank,
            },
            rank_3: {
                intra_id: RankInfo_db.rankList[2].login,
                intra_picture: RankInfo_db.rankList[2].intra_picture,
                rank: RankInfo_db.rankList[2].rank,
            },
            rank_4: {
                intra_id: RankInfo_db.rankList[3].login,
                intra_picture: RankInfo_db.rankList[3].intra_picture,
                rank: RankInfo_db.rankList[3].rank,
            },
            rank_5: {
                intra_id: RankInfo_db.rankList[4].login,
                intra_picture: RankInfo_db.rankList[4].intra_picture,
                rank: RankInfo_db.rankList[4].rank,
            },
            rank_6: {
                intra_id: RankInfo_db.rankList[5].login,
                intra_picture: RankInfo_db.rankList[5].intra_picture,
                rank: RankInfo_db.rankList[5].rank,
            }
        }
    console.log('data----------1');
    console.log(data);
    console.log('data-----------2');
    return { props: data}
}

export default function Rank(props: RankInfo) {
    return (
        <div id="root">
            <TopBar></TopBar>
            <RankLayout rand_data={props}></RankLayout>
        </div>
    );
}

// const Rank: React.FC<{ rank_info: RankInfo }> = ({ rank_info }) => {
//     console.log('rank_info----------1');
//     console.log(rank_info);
//     console.log('rank_info---------2');
//     return (
//       <div id="root">
//         <TopBar />
//         <RankLayout rand_data={rank_info} />
//       </div>
//     );
// }

// export default Rank;


// export default function Rank() {
//     let rank_info = {
//         rank_1: {
//             intra_id: "woosekim",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 1,
//         },
//         rank_2: {
//             intra_id: "dfasf",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 2,
//         },
//         rank_3: {
//             intra_id: "w12412",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 3,
//         },
//         rank_4: {
//             intra_id: "5325im",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 4,
//         },
//         rank_5: {
//             intra_id: "235235m",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 5,
//         },
//         rank_6: {
//             intra_id: "2352351",
//             intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
//             rank: 6,
//         }
//     }
    
//     return (
//         <div id="root">
//             <TopBar></TopBar>
//             <RankLayout rand_data={rank_info}></RankLayout>
//         </div>
//     );
// }
