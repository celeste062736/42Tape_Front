import type { GetServerSideProps } from 'next'
import { getToken } from "next-auth/jwt"
import { TopBar } from '../../components/topbar'
import { RankLayout, RankLayoutProps } from '../../components/rank'
import type { RankInfo, IndividualSeason, SeasonInfo } from '../../components/rank'
import type { RankInfo_DB } from '../rank'



export default function Rank_Page(props: { rankInfo: RankInfo, rankLayoutProps: RankLayoutProps }) {
    return (
        <div id="root">
            <TopBar></TopBar>
            <RankLayout RankLayoutProps={ props.rankLayoutProps }></RankLayout>
        </div>
  );
}


export const getServerSideProps: GetServerSideProps<{
  rankLayoutProps: RankLayoutProps
  }> = async ({ req, res, params }) => {
    const unknownRank : RankInfo[] = [
      {
        intra_id: "unknown",
        user_id: 0,
        intra_picture: "unknown",
        rank: 0,
        season_id: 0,
        start_at : "unknown",
        end_at : "unknown",
        cumulative_total_score : 0
      },
      {
        intra_id: "unknown",
        user_id: 0,
        intra_picture: "unknown",
        rank: 0,
        season_id: 0,
        start_at : "unknown",
        end_at : "unknown",
        cumulative_total_score : 0
      },
      {
        intra_id: "unknown",
        user_id: 0,
        intra_picture: "unknown",
        rank: 0,
        season_id: 0,
        start_at : "unknown",
        end_at : "unknown",
        cumulative_total_score : 0
      },
      {
        intra_id: "unknown",
        user_id: 0,
        intra_picture: "unknown",
        rank: 0,
        season_id: 0,
        start_at : "unknown",
        end_at : "unknown",
        cumulative_total_score : 0
      },
      {
          intra_id: "unknown",
          user_id: 0,
          intra_picture: "unknown",
          rank: 0,
          season_id: 0,
          start_at : "unknown",
          end_at : "unknown",
          cumulative_total_score : 0
      },
      {
          intra_id: "unknown",
          user_id: 0,
          intra_picture: "unknown",
          rank: 0,
          season_id: 0,
          start_at : "unknown",
          end_at : "unknown",
          cumulative_total_score : 0
      }
    ]
  
    const unknownLayout : RankLayoutProps = {
      rand_data: unknownRank,
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
  const token = await getToken({req})
  if (!token) {
    return { props : { rankLayoutProps: unknownLayout }}
  }

  let userId : string | undefined;
  if(token.sub === null) {
      userId = undefined;
  } else {
      userId = token.sub;
  }
  let rankId = params?.rank_id
  const resp = await fetch(process.env.FETCH_URL+'ranking' + `/${String(rankId)}`, {
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

  const rankInfo: RankInfo[] = RankInfo_db.rankList.map((item) => ({
      intra_id: item.login,
      user_id: item.ranker_user_id,
      intra_picture: item.intra_picture || process.env.NEXT_PUBLIC_PICTURE!,
      rank: item.rank,
      season_id: RankInfo_db.currentSeason.season_id,
      start_at : RankInfo_db.currentSeason.start_at,
      end_at : RankInfo_db.currentSeason.end_at,
      cumulative_total_score : item.cumulative_total_score
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


  // console.log('data----------1');
  // console.log(data);
  // console.log('data-----------2');
  const rankLayoutProps : RankLayoutProps = {
      rand_data: rankInfo,
      SeasonInfo: SeasonInfo
  }
  return { props : { rankLayoutProps: rankLayoutProps }}
}
