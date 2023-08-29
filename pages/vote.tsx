import { TopBar } from "../components/topbar";
import { VoteLayout } from '../components/vote'
import type { GetServerSideProps } from "next";
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

export interface VoteListInfo {
    vote_id: number;
    project_name: string;
    season_id: number;
    filled_at: string;
}
  
export interface VoteInfo_DB {
    voteList: VoteListInfo[];
}

export default function Vote(props: {voteInfo: VoteListInfo[]}) {
    // from backend API_DOC example data
    return (
        <div id="root">
            <TopBar></TopBar>
            <VoteLayout vote_data={props.voteInfo}></VoteLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
    voteInfo: VoteListInfo[]
  }> = async ({ req, res }) => {
    const token = await getToken({req})
    const dataUnknown : VoteListInfo[] = [
      {
        vote_id: -1,
        project_name: "unknown",
        season_id: -11,
        filled_at: "unknown"
      },
    ]
    if (!token) {
      return { props : {voteInfo: dataUnknown} }
    }
  
    let userId : string | undefined;
    if(token.sub === null) {
      userId = undefined;
    } else {
      userId = token.sub;
    }
    const resp = await fetch('http://localhost:8080/vote_list', {
      method: "GET",
      //type script에선 headers에 undefined나 null이 들어가면 에러가 난다.
      //삼항연산자로 userId가 undefined면 빈 객체를 넣어준다.
      //헤더가 빈객체면 서버에서는 헤더가 없는 것으로 인식한다. 그러므로 해당부분 에러처리를 해줘야한다.
      headers: userId ? { "user-id": userId } : {}
    })
    const repo : any = await resp.json()
    const voteList : VoteListInfo[] = repo.voteList;
    console.log(voteList)
    return { props: {voteInfo: voteList}}
  }