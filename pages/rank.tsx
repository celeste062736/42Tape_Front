import { TopBar } from '../components/topbar'
import { RankLayout } from '../components/rank'
import type { GetServerSideProps } from 'next'
import type { Season } from '../components/Components'
import { getToken } from "next-auth/jwt"
import type { RankLayoutProps } from '../components/rank'
import type { NotificationResponse } from '../components/topbar'
import type { RankInfo, SeasonInfo, IndividualRank, IndividualSeason } from '../components/rank'


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

export interface RankInfo_NotiInfo {
    RankInfo : RankInfo;
    NotiInfo : NotificationResponse;
}

export interface RankInfoNotiInfoProps {
    rankInfo_NotiInfo : RankInfo_NotiInfo;
    rankLayoutProps: RankLayoutProps;
}
  
export default function Rank_Page(props: {rankInfoNotiInfoProps: RankInfoNotiInfoProps}) {
    // console.log('--------------------props.rankInfo_NotiInfo.NotiInfo');
    // console.log(props.rankInfoNotiInfoProps);
    // // console.log(props.rankInfo_NotiInfo.NotiInfo);
    // console.log('--------------------props.rankInfo_NotiInfo.NotiInfo');
    return (
        <div id="root">
            <TopBar NotiInfo={ props.rankInfoNotiInfoProps.rankInfo_NotiInfo.NotiInfo }></TopBar>
            <RankLayout RankLayoutProps={ props.rankInfoNotiInfoProps.rankLayoutProps }></RankLayout>
        </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
    rankInfoNotiInfoProps: RankInfoNotiInfoProps
    }> = async ({ req, res }) => {
    const dataUnknown : RankInfoNotiInfoProps = {
        rankInfo_NotiInfo: {
        NotiInfo: {
            user_sub: '',
            receiver: '',
            number_notifications: 0,
            need_notify: false,
            notificationList: [],
        },
        RankInfo: [
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            },
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            },
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            },
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            },
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            },
            {
                intra_id: "unknown",
                intra_picture: "unknown",
                rank: 0,
                season_id: 0,
                start_at : "unknown",
                end_at : "unknown",
            }
        ]
    },
    rankLayoutProps: {
        rand_data: [],
        SeasonInfo: {
            currentSeason: {
                season_id: 0,
                start_at: "unknown",
                end_at: "unknown",
            },
            pageSeason: {
                season_id: 0,
                start_at: "unknown",
                end_at: "unknown",
            }
        }
    }
}
    const token = await getToken({req})
    if (!token) {
      return { props : { rankInfoNotiInfoProps: dataUnknown }}
    }

    let userId : string | undefined;
    if(token.sub === null) {
        userId = undefined;
    } else {
        userId = token.sub;
    }
    const resp = await fetch(process.env.FETCH_URL+'ranking', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const RankInfo_db : RankInfo_DB = await resp.json()
    // const RankInfo : RankInfo = [
    //     {
    //         intra_id: RankInfo_db.rankList[0].login,
    //         intra_picture: RankInfo_db.rankList[0].intra_picture || "./default-profile.png",
    //         rank: RankInfo_db.rankList[0].rank,
    //     },
    //     {
    //         intra_id: RankInfo_db.rankList[1].login,
    //         intra_picture: RankInfo_db.rankList[1].intra_picture || "./default-profile.png",
    //         rank: RankInfo_db.rankList[1].rank,
    //     },
    // ]

    const RankInfo: RankInfo = RankInfo_db.rankList.map((item) => ({
        intra_id: item.login,
        intra_picture: item.intra_picture || "./default-profile.png",
        rank: item.rank,
        season_id: RankInfo_db.currentSeason.season_id,
        start_at : RankInfo_db.currentSeason.start_at,
        end_at : RankInfo_db.currentSeason.end_at,
    }));

    const SeasonInfo: SeasonInfo = {
        currentSeason: RankInfo_db.currentSeason,
        pageSeason: RankInfo_db.pageSeason
    }
    // const RankInfo : RankInfo = {
    //         rank_1: {
    //             intra_id: RankInfo_db.rankList[0].login,
    //             intra_picture: RankInfo_db.rankList[0].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[0].rank,
    //         },
    //         rank_2: {
    //             intra_id: RankInfo_db.rankList[1].login,
    //             intra_picture: RankInfo_db.rankList[1].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[1].rank,
    //         },
    //         rank_3: {
    //             intra_id: RankInfo_db.rankList[2].login,
    //             intra_picture: RankInfo_db.rankList[2].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[2].rank,
    //         },
    //         rank_4: {
    //             intra_id: RankInfo_db.rankList[3].login,
    //             intra_picture: RankInfo_db.rankList[3].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[3].rank,
    //         },
    //         rank_5: {
    //             intra_id: RankInfo_db.rankList[4].login,
    //             intra_picture: RankInfo_db.rankList[4].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[4].rank,
    //         },
    //         rank_6: {
    //             intra_id: RankInfo_db.rankList[5].login,
    //             intra_picture: RankInfo_db.rankList[5].intra_picture || "./default-profile.png",
    //             rank: RankInfo_db.rankList[5].rank,
    //         }
    //     }
    // console.log('RankInfo_db');    
    // console.log(RankInfo_db);
    const resp2 = await fetch(process.env.FETCH_URL+'notification', {
        method: "GET",
        headers: userId ? { "user-id": userId } : {}
    })
    const repo2 : NotificationResponse = await resp2.json()
    // console.log('notification');
    // console.log(token);
    // console.log('notification');
    // notificationList에 데이터 수동으로 넣기
    // repo2.notificationList = [
    //     {
    //         "type": "got_new_vote",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": false
    //     },
    //     {
    //         "type": "got_new_vote",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": true
    //     },
    //     {
    //         "type": "got_new_vote",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": true
    //     }
    //     ]
    // repo2.notificationList = []

    const NotiInfo : NotificationResponse = {
    user_sub:  String(token.sub),
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    need_notify: repo2.need_notify,
    notificationList: repo2.notificationList,
    }
    // console.log(repo2.notificationList);
    const rankInfo_NotiInfo : RankInfo_NotiInfo = {
      RankInfo: RankInfo,
      NotiInfo: NotiInfo,
    }
    // console.log('data----------1');
    // console.log(data);
    // console.log('data-----------2');
    const rankLayoutProps : RankLayoutProps = {
        rand_data: RankInfo,
        SeasonInfo: SeasonInfo
    }
    const RankInfoNotiInfoProps : RankInfoNotiInfoProps = {
        rankInfo_NotiInfo : rankInfo_NotiInfo,
        rankLayoutProps : rankLayoutProps
    }
    return { props: { rankInfoNotiInfoProps : RankInfoNotiInfoProps}}
}
