import { TopBar } from '../components/topbar'
import { RankLayout } from '../components/rank'
import type { GetServerSideProps } from 'next'
import type { Season } from '../components/Components'
import { getToken } from "next-auth/jwt"
import type { IndividualRank } from '../components/rank'
import type { NotificationResponse } from '../components/topbar'

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

export interface RankInfo_NotiInfo {
    RankInfo : RankInfo;
    NotiInfo : NotificationResponse;
}

export interface RankInfoNotiInfoProps {
    rankInfo_NotiInfo : RankInfo_NotiInfo;
}
  
export default function Rank(props: RankInfoNotiInfoProps) {
    return (
        <div id="root">
            <TopBar NotiInfo={ props.rankInfo_NotiInfo.NotiInfo }></TopBar>
            <RankLayout rand_data={ props.rankInfo_NotiInfo.RankInfo }></RankLayout>
        </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
    rankInfo_NotiInfo: RankInfo_NotiInfo
  }> = async ({ req, res }) => {
    const dataUnknown : RankInfo_NotiInfo = {
        NotiInfo: {
            receiver: '',
            number_notifications: 0,
            need_notify: false,
            notificationList: [],
        },
        RankInfo: {
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
    }
    const token = await getToken({req})
    if (!token) {
      return { props : { rankInfo_NotiInfo: dataUnknown }}
    }

    let userId : string | undefined;
    if(token.sub === null) {
        userId = undefined;
    } else {
        userId = token.sub;
    }
    const resp = await fetch('http://localhost:8080/ranking', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const RankInfo_db : RankInfo_DB = await resp.json()
    const RankInfo : RankInfo = {
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
    const resp2 = await fetch('http://localhost:8080/notification', {
        method: "GET",
        headers: userId ? { "user-id": userId } : {}
    })
    const repo2 : NotificationResponse = await resp2.json()
    console.log('notification');
    console.log(token);
    console.log('notification');
    //notificationList에 데이터 수동으로 넣기
    repo2.notificationList = [
        {
            "type": "got_new_vote",
            "createdAt": "Mon Aug 28 2023",
            "notified": false
        },
        {
            "type": "got_new_vote",
            "createdAt": "Mon Aug 28 2023",
            "notified": true
        },
        {
            "type": "got_new_vote",
            "createdAt": "Mon Aug 28 2023",
            "notified": true
        }
        ]
    const NotiInfo : NotificationResponse = {
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    // need_notify: repo2.need_notify,
    need_notify: true,
    notificationList: repo2.notificationList,
    }
    console.log(repo2.notificationList);
    const data : RankInfo_NotiInfo = {
      RankInfo: RankInfo,
      NotiInfo: NotiInfo,
    }
    console.log('data----------1');
    console.log(data);
    console.log('data-----------2');
    return { props: { rankInfo_NotiInfo : data}}
}
