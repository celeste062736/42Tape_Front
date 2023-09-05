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
    candidate_for_reward: boolean;
}
  
export interface VoteInfo_DB {
    voteList: VoteListInfo[];
}


export default function Vote({ voteLists }: { voteLists: VoteListInfo[] }) {
    // from backend API_DOC example data
    
    return (
        <div id="root">
            <TopBar></TopBar>
            <VoteLayout vote_data={voteLists}></VoteLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
  voteLists: VoteListInfo[]
    }> = async ({ req, res }) => {
    const token = await getToken({req})
    //votelist_notiinfo에 에러일때 처리해줄 데이터 넣어주기
    const dataUnknown : VoteListInfo[] = [
      {
        vote_id: -1,
        project_name: "unknown",
        season_id: -1,
        filled_at: "unknown",
        candidate_for_reward: false,
      }
    ]
    if (!token) {
      return { props : { voteLists: dataUnknown } }
    }
  
    let userId : string | undefined;
    if(token.sub === null) {
      userId = undefined;
    } else {
      userId = token.sub;
    }
    const resp = await fetch(process.env.FETCH_URL+'vote_list', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const repo : any = await resp.json()
    // console.log('---------------------1--------------------repo');
    // console.log(repo);
    let voteLists : VoteListInfo[] = repo.voteList;
    //map으로 돌려서 repo.tape_user.candidate_for_reward의 결과를 각 voteList에 넣어주기
    voteLists.map((item, index) => {
      item.candidate_for_reward = repo.tape_user.candidate_for_reward;
    })
    // console.log('---------------------2--------------------voteLists');
    // console.log(voteLists);
    // console.log(voteLists[0]);
    return { props: { voteLists: voteLists }}
  }

