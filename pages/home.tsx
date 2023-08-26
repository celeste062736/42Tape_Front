import { TopBar, MainLayout } from "../components/temp_components";

type UserInfo = {
  user: {
    intra_id: string;
    intra_picture: string;
    before_rank: number;
    current_rank: number;
    level: number;
    stat1: number;
    stat2: number;
    stat3: number;
    stat4: number;
    stat5: number;
  };
};

type MainLayoutProps = {
  _userInfo: UserInfo;
};

const MainLayout: React.FC<MainLayoutProps> = ({ _userInfo }) => {
  // 컴포넌트 로직
  return (
    // JSX
  );
};

export default function Home() {
  //props.param.id 로 접속한 인트라 아이디 가져오기
  let user_info = {
    user: {
        intra_id: "woosekim",
        intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg",
        before_rank: 10,
        current_rank: 1,
        level: 4.81,
        stat1 : 10,
        stat2 : 20,
        stat3 : 8,
        stat4 : 12,
        stat5 : 17,
    }
  }
  return (
    <div id="root">
      <TopBar></TopBar>
      <MainLayout _userInfo={user_info}></MainLayout>
    </div>
  )
}