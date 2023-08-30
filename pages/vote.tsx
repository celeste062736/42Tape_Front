import { TopBar } from "../components/topbar";
import { VoteLayout } from '../components/vote'
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt"
import type { NotificationResponse } from "../components/topbar"

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

export interface VoteListInfo {
    vote_id: number;
    project_name: string;
    season_id: number;
    filled_at: string;
}
  
export interface VoteInfo_DB {
    voteList: VoteListInfo[];
}

export interface VoteList_NotiInfo {
  voteList : VoteListInfo[];
  NotiInfo : NotificationResponse;
}

export interface VoteListNotiInfoProps {
  voteList_NotiInfo : VoteList_NotiInfo;
}

export default function Vote(props: VoteListNotiInfoProps) {
    // from backend API_DOC example data
    
    return (
        <div id="root">
            <TopBar NotiInfo={ props.voteList_NotiInfo.NotiInfo }></TopBar>
            <VoteLayout vote_data={props.voteList_NotiInfo.voteList}></VoteLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
    voteList_NotiInfo: VoteList_NotiInfo
    }> = async ({ req, res }) => {
    const token = await getToken({req})
    //votelist_notiinfo에 에러일때 처리해줄 데이터 넣어주기
    const dataUnknown : VoteList_NotiInfo = {
      voteList: [
        {
          vote_id: -1,
          project_name: "unknown",
          season_id: -1,
          filled_at: "unknown"
        },
      ],
      NotiInfo: {
        user_sub: '',
        receiver: "unknown",
        number_notifications: -1,
        need_notify: false,
        notificationList: [],
      }
    }
    if (!token) {
      return { props : { voteList_NotiInfo: dataUnknown } }
    }
  
    let userId : string | undefined;
    if(token.sub === null) {
      userId = undefined;
    } else {
      userId = token.sub;
    }
    const resp = await fetch('http://localhost:8080/vote_list', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const repo : any = await resp.json()
    const voteList : VoteListInfo[] = repo.voteList;
    // console.log(voteList)


    const resp2 = await fetch('http://localhost:8080/notification', {
        method: "GET",
        headers: userId ? { "user-id": userId } : {}
    })
    const repo2 : NotificationResponse = await resp2.json()
    // console.log('notification');
    // console.log(token);
    // console.log('notification');
    //notificationList에 데이터 수동으로 넣기
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
    const NotiInfo : NotificationResponse = {
      user_sub:  String(token.sub),
      receiver: repo2.receiver,
      number_notifications: repo2.number_notifications,
      need_notify: repo2.need_notify,
      notificationList: repo2.notificationList,
    }
    // console.log(repo2.notificationList);
    const data : VoteList_NotiInfo = {
      voteList: voteList,
      NotiInfo: NotiInfo,
    }
    // console.log('data----------1');
    // console.log(data);
    // console.log('data-----------2');
    return { props: {voteList_NotiInfo: data}}
  }