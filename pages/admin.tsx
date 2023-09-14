import { TopBar } from "../components/topbar";
import { AdminLayout } from '../components/admin'
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt"

export interface reward_list_info {
  user_id: number,
  login: string,
  email: string,
  reward: string
}

export interface season_reward_record {
  season_id: number,
  start_at: string,
  end_at: string,
  reward_end_at: string,
  reward_list : reward_list_info[]
}

export default function Admin({ seasonRewardRecordLists }: { seasonRewardRecordLists: season_reward_record[] }) {
    // from backend API_DOC example data
    
    return (
        <div id="root">
            <TopBar></TopBar>
            <AdminLayout reward_data={seasonRewardRecordLists}></AdminLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
  seasonRewardRecordLists: season_reward_record[];
    }> = async ({ req, res }) => {
    const token = await getToken({req})
    //votelist_notiinfo에 에러일때 처리해줄 데이터 넣어주기
    const dataUnknown : season_reward_record[] = [
      {
        season_id: -1,
        start_at: "test",
        end_at: "unknown",
        reward_end_at: "unknown",
        reward_list : [
          {
            user_id: -1,
            login: "unknown",
            email: "unknown",
            reward: "unknown"
          }
        ]
      }
    ]
    if (!token) {
      return { props : { seasonRewardRecordLists: dataUnknown } }
    }
  
    let userId : string | undefined;
    if(token.sub === null) {
      userId = undefined;
    } else {
      userId = token.sub;
    }
    const resp = await fetch(process.env.FETCH_URL+'admin', {
      method: "GET",
      headers: userId ? { "user-id": userId } : {}
    })
    const repo : any = await resp.json()
    console.log('---------------------1--------------------repo');
    console.log(repo);
    let seasonRewardRecordLists : season_reward_record[] = repo.season_reward_records;
    //map으로 돌려서 repo.tape_user.candidate_for_reward의 결과를 각 voteList에 넣어주기
    // seasonRewardRecordLists.map((item, index) => {
    //   item.candidate_for_reward = repo.tape_user.candidate_for_reward;
    // })
    // console.log('---------------------2--------------------voteLists');
    // console.log(voteLists);
    // console.log(voteLists[0]);
    return { props: { seasonRewardRecordLists: seasonRewardRecordLists }}
  }

