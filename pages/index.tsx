import Layout from "../components/layout"
import { MainLayout, TopBar } from '../components/Components'
// import UserInfo from '../components/Components'

export const metadata = {
  title: '42TAPE',
  description: '42 The Art of Peer Evaluation',
}

export interface UserInfo {
  intra_picture: string;
  level: number;
  intra_id: string;
  stats: number[];
  current_rank: number;
  rankHistory: number[];
};


export default function Home(props: UserInfo) {
  //props.param.id 로 접속한 인트라 아이디 가져오기
    let intra_id = "woosekim";
    let intra_picture = "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg";
    let level = 4.81;
    let stats = [10, 20, 8, 12, 17];
    let current_rank = 1;
    let rankHistory = [1, 2];
  return (
    <div id="root">
      <TopBar></TopBar>
      <MainLayout user_id={intra_id} intra_pic={intra_picture} level={level} stats={stats} current_rank={current_rank} rankHistory={rankHistory}></MainLayout>
    </div>
  )
}
