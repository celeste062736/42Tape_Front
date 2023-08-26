"use client";
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { signIn } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type BlankProps = {
  name: 'top' | 'main' | string;
};

export function Blank(props: BlankProps) {
  if (props.name === "top") {
    return <div className="col-2 d-none d-xl-block"></div>;
  } else if (props.name === "main") {
    return <div className="col-2 d-none"></div>;
  } else {
    return null;
  }
}

export default function ListButton() {
  const [showList, setShowList] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node) && 
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button ref={buttonRef} className="Button" onClick={() => setShowList(!showList)}>
        <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H30" stroke="black" strokeWidth="2"/>
          <path d="M0 13.5H30" stroke="black" strokeWidth="2"/>
          <path d="M0 26H30" stroke="black" strokeWidth="2"/>
        </svg>
      </button>

      {showList && (
        <div className="list-box" ref={listRef}>
          <ul style={{padding: '10px', margin: '0'}}>
            <li><Button name="vote_in_list_box"></Button></li>
            <br></br>
            <li><Button name="rank_in_list_box"></Button></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function LogoImg() {
  var path = "/";
  return (
    <svg width="66" height="60" viewBox="0 0 66 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <a href={path}>
        <svg width="66" height="60" viewBox="0 0 66 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M66 49C60.4258 45.0381 59 33 59 27L45 38C45.0384 48.3866 45.9182 55.68 56.5 60V54.5L62 55.5L61 50.5L66 49Z" fill="#6181FF"/>
          <path d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM38.5 21.5C33.8056 16.8056 26.1944 16.8056 21.5 21.5C16.8056 26.1944 16.8056 33.8056 21.5 38.5C26.1944 43.1944 33.8056 43.1944 38.5 38.5C43.1944 33.8056 43.1944 26.1944 38.5 21.5Z" fill="#6181FF"/>
          <circle cx="30" cy="30" r="16" stroke="white" strokeWidth="2"/>
        </svg>
      </a>
    </svg>
  )
}

export function LogoName() {
  return (
    <a id="logo" href="/">42TAPE</a>
  )
}

export function SearchBar() {
  return (
    <div className="input-group">
      <input id="searchSpace" type="text" className="form-control" placeholder="Search"></input>
      <button id="searchButton" className="Button">
        <svg width="30" height="30" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.0693 14.6968C27.0693 22.0257 21.3055 27.8936 14.2847 27.8936C7.26382 27.8936 1.5 22.0257 1.5 14.6968C1.5 7.3679 7.26382 1.5 14.2847 1.5C21.3055 1.5 27.0693 7.3679 27.0693 14.6968Z" stroke="#6181ff" strokeWidth="3"/>
          <line x1="24.1149" y1="24.9966" x2="33.1149" y2="34.9966" stroke="#6181ff" strokeWidth="3"/>
        </svg>
      </button>
    </div>
  )
}

function LogoutButton() {
  const handleLogout = () => {
    // 토큰 기반 인증의 경우
    localStorage.removeItem('token');
    // Next.js에서 페이지를 리다이렉트하는 방법
    window.location.href = '/';
  };
  return <button id="logout_btn" onClick={handleLogout}>LOGOUT</button>;
}

export function Alarm() {
  return (
    <button className="Button">
      <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C28.4518 50 31.25 47.2018 31.25 43.75H18.75C18.75 47.2018 21.5482 50 25 50Z" fill="#6181ff"/>
        <path d="M25 5.99453L22.5088 6.49766C16.7985 7.6509 12.5001 12.702 12.5001 18.75C12.5001 20.712 12.0802 25.6164 11.0661 30.4443C10.5627 32.8409 9.88919 35.3363 8.99404 37.5H41.006C40.1108 35.3363 39.4373 32.8409 38.934 30.4442C37.9199 25.6164 37.5001 20.7119 37.5001 18.75C37.5001 12.7019 33.2016 7.65084 27.4913 6.49764L25 5.99453ZM44.4353 37.5C45.133 38.8981 45.9421 40.0031 46.875 40.625H3.125C4.0579 40.0031 4.86702 38.8981 5.56469 37.5C8.37257 31.873 9.37507 21.4974 9.37507 18.75C9.37507 11.1854 14.7506 4.8764 21.8901 3.43451C21.8801 3.33269 21.875 3.22944 21.875 3.125C21.875 1.39911 23.2741 0 25 0C26.7259 0 28.125 1.39911 28.125 3.125C28.125 3.22944 28.1199 3.33267 28.1099 3.43448C35.2494 4.87632 40.6251 11.1854 40.6251 18.75C40.6251 21.4974 41.6275 31.873 44.4353 37.5Z" fill="#6181ff"/>
      </svg>
    </button>
  )
}

export function Info() {
  return (
    <button className="Button">
      <svg width="30" height="30" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.89062 25.9602V25.6364C7.91335 23.5227 8.12358 21.8409 8.52131 20.5909C8.9304 19.3409 9.50994 18.3295 10.2599 17.5568C11.0099 16.7841 11.9134 16.0795 12.9702 15.4432C13.652 15.0114 14.2656 14.5284 14.8111 13.9943C15.3565 13.4602 15.7884 12.8466 16.1065 12.1534C16.4247 11.4602 16.5838 10.6932 16.5838 9.85227C16.5838 8.84091 16.3452 7.96591 15.8679 7.22727C15.3906 6.48864 14.7543 5.92045 13.9588 5.52273C13.1747 5.11364 12.2997 4.90909 11.3338 4.90909C10.4588 4.90909 9.62358 5.09091 8.82812 5.45455C8.03267 5.81818 7.37358 6.38636 6.85085 7.15909C6.32813 7.92045 6.02699 8.90341 5.94744 10.108H0.765625C0.84517 8.0625 1.36222 6.33523 2.31676 4.92614C3.27131 3.50568 4.53267 2.43182 6.10085 1.70454C7.6804 0.977271 9.42472 0.613635 11.3338 0.613635C13.4247 0.613635 15.2543 1.00568 16.8224 1.78977C18.3906 2.5625 19.6065 3.64773 20.4702 5.04545C21.3452 6.43182 21.7827 8.05114 21.7827 9.90341C21.7827 11.1761 21.5838 12.3239 21.1861 13.3466C20.7884 14.358 20.2202 15.2614 19.4815 16.0568C18.7543 16.8523 17.8793 17.5568 16.8565 18.1705C15.8906 18.7727 15.1065 19.3977 14.5043 20.0455C13.9134 20.6932 13.4815 21.4602 13.2088 22.3466C12.9361 23.233 12.7884 24.3295 12.7656 25.6364V25.9602H7.89062ZM10.4645 36.3239C9.53267 36.3239 8.73153 35.9943 8.06108 35.3352C7.39063 34.6648 7.0554 33.858 7.0554 32.9148C7.0554 31.983 7.39063 31.1875 8.06108 30.5284C8.73153 29.858 9.53267 29.5227 10.4645 29.5227C11.3849 29.5227 12.1804 29.858 12.8509 30.5284C13.5327 31.1875 13.8736 31.983 13.8736 32.9148C13.8736 33.5398 13.7145 34.1136 13.3963 34.6364C13.0895 35.1477 12.6804 35.5568 12.169 35.8636C11.6577 36.1705 11.0895 36.3239 10.4645 36.3239Z" fill="#6181ff"/>
      </svg>
    </button>
  )
}

export function Tools() {
  return (
    <>
      <Alarm></Alarm>
      <Info></Info>
      <LogoutButton></LogoutButton>
    </>
  )
}

export function TopBar() {
  return (
    <div className="row align-items-center" style={{margin: '0px'}}>
      <div className="col-1 d-flex justify-content-center align-items-center d-block d-xl-none">
        <ListButton></ListButton>
      </div>
      <div id="logo_img" className="col-1 d-flex justify-content-center align-items-center" style={{width: '60px'}}>
        <LogoImg></LogoImg>
      </div>
      <div className="col-2 d-none d-xl-block" style={{width: '120px'}}>
        <LogoName></LogoName>
      </div>
      <Blank name="top"></Blank>
      <div className="col d-flex justify-content-center align-items-center" style={{height: '100px', padding: 0}}>
        <SearchBar></SearchBar>
      </div>
      <div className="col-2 d-none d-xl-block"></div>
      <div className="col-2 d-flex justify-content-around align-items-center" style={{width: '150px'}}>
        <Tools></Tools>
      </div>
    </div>
  )
}

type ButtonProps = {
  name: "vote" | "rank" | "vote_in_list_box" | "rank_in_list_box";
};

export function Button(props: ButtonProps) {
  if (props.name === "vote") {
    return (
      <Link href='/vote'><button className="btn btn-primary" style={{width: '240px', height: '50px'}}>Vote</button></Link>
    );
  } else if (props.name === "rank") {
    return (
      <Link href='/rank'><button className="btn btn-primary" style={{width: '240px', height: '50px'}}>Rank</button></Link>
    );
  } else if (props.name === "vote_in_list_box") {
    return (
      <Link href='/vote'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Vote</button></Link>
    )
  } else if (props.name === "rank_in_list_box") {
    return (
      <Link href='/rank'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Rank</button></Link>
    )
  } else {
    return null;
  }
}

type ProfileProps = {
  intra_pic: string;
  level: number;
  user_id: string;
};

export function Profile({ intra_pic, level, user_id }: ProfileProps) {
  return (
    <div className="profile">
      <div className="centered-container">
        <img id="intra_picture" src={intra_pic} alt="intra picture" className="rounded-circle"/>
        <div id="profile_level">
          Lv. {level}
        </div>
        <div id="profile_intra_id">
          {user_id}
        </div>
      </div>
    </div>
  )
}

// type User = {
//   intra_picture?: string;
//   level?: number;
//   intra_id?: string;
//   current_rank?: number;
//   stat1?: number;
//   stat2?: number;
//   stat3?: number;
//   stat4?: number;
//   stat5?: number;
//   rankHistory?: number[];
// };

// export type UserInfo = {
//   intra_picture: string;
//   level: number;
//   intra_id: string;
//   stat1: number;
//   stat2: number;
//   stat3: number;
//   stat4: number;
//   stat5: number;
//   current_rank: number;
//   rankHistory: number[];
// };

// type UserInfo = {
//   stat1: number;
//   stat2: number;
//   stat3: number;
//   stat4: number;
//   stat5: number;
//   current_rank: number;
//   rankHistory: number[];
// };

type RadarChartProps = {
  stats: number[];
  current_rank: number;
};

export function RadarChart({stats, current_rank} : RadarChartProps) {
  const data = {
    labels: ['Rigorous', 'Communication', 'Constructive Suggestions', 'Informative', 'Sharp Questions'],
    datasets: [
      {
        label: 'Evaluation stats',
        data: [stats[0], stats[1], stats[2], stats[3], stats[4]],
        fill: true,
        backgroundColor: 'rgba(228,234,240,0.5)',
        borderColor: 'rgba(40,181,225,1)',
        pointBackgroundColor: 'rgba(40,181,225,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
      },
    ]
  };
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    },
    scales: {
      r: {
        ticks: {
          stepSize: 5,
          display: true,
        },
        angleLines: {
          display: true
        },
        pointLabels: {
          font: {
            size: 10,
            weight: '700',
            family: 'Pretendard',
          },
          color: '#000',
        },
        suggestedMin: 0,
        suggestedMax: 20,
      }
    }
  };
  return (
    <div className="profile">
      <div id="profile_rank">
        Rank #{current_rank}
      </div>
      <Radar data={data} options={options}/>
    </div>
  )

}

type LineChartProps = {
  rankHistory: number[];
};

export function LineChart({rankHistory}: LineChartProps) {
  // Assuming you want to use rankHistory from userInfo in the data object:
  const data : ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 9', 'Week 10'],
    datasets: [
      {
        label: 'Ranking history in the current season',
        data: rankHistory,  // Use rankHistory from userInfo here
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const options : ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,  // 폰트 사이즈를 12로 설정
            weight: 'bold'  // 폰트를 bold 처리
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        reverse: true,
        ticks: {
          stepSize: 1,  // y축 간격을 1로 설정
        }
      },
      x: {
        ticks: {
          // fontSize: 10,  // 라벨의 폰트 사이즈를 10으로 설정
          font: {
            // weight: 'bold'  // 라벨을 bold 처리
          }
        },
      },
    },
  };

  return (
    <div className="profile_line_chart">
      <Line data={data} options={options} />
    </div>
  );
}
  
export function Copyright() {
  return (
    <div id="copyright">
      @2023 all 42 TAPE
    </div>
  )
}

export interface UserInfoProps {
  userInfo : UserInfo;
}

export interface UserInfo {
  intra_pic: string;
  level: number;
  user_id: string | undefined;
  stats: number[];
  current_rank: number;
  rankHistory: number[];
};

export const MainLayout = ({ userInfo } : UserInfoProps) => {
  if (userInfo.user_id === undefined) {
    userInfo.user_id = 'unknown'
  }
  return (
    <div className="row" style={{margin: '0px'}}>
      <div className="col-2 d-none d-xl-block" style={{width: '270px'}}>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="vote"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="rank"></Button>
        </div>
      </div>
        
      <div className="col">
        <div className="row">
          <div className="col-xl-5 d-flex justify-content-center align-items-center">
            <Profile intra_pic={userInfo.intra_pic} level={userInfo.level} user_id={userInfo.user_id}/>
          </div>
          <div className="col-xl-5 d-flex justify-content-center align-items-center">
            <RadarChart stats={userInfo.stats} current_rank={userInfo.current_rank}></RadarChart>
          </div>
          <Blank name="main"></Blank>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <LineChart rankHistory={userInfo.rankHistory}></LineChart>
          </div>
          <Blank name="main"></Blank>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <Copyright></Copyright>
          </div>
          <Blank name="main"></Blank>
        </div>
      </div>
    </div>
  )
}

export function LoginTopBar() {
  return (
    <div className="row align-items-center" style={{margin: '0px'}}>
      <div className="col-1 d-flex justify-content-center align-items-center d-block d-xl-none">
      </div>
      <div id="logo_img" className="col-1 d-flex justify-content-center align-items-center" style={{width: '60px'}}>
        <LogoImg></LogoImg>
      </div>
      <div className="col-2 d-none d-xl-block" style={{width: '120px'}}>
        <LogoName></LogoName>
      </div>
      <div className="col d-flex justify-content-center align-items-center" style={{height: '100px'}}>
      </div>
      <div className="col-2 d-none d-xl-block"></div>
      <div className="col-2 d-flex justify-content-around align-items-center" style={{width: '150px'}}>
      </div>
    </div>
  )
}

export function LoginLayout() {
  let user_info = "woosekim";

  return (
    <div className="row">
      <div className="col"></div>
      <div id="login_button_align" className="col">
          <a><button id="login_button" className="btn btn-secondary" onClick={(e) => {
                  signIn('42-school')
                }}>Login</button></a>
      </div>
      <div className="col"></div>
    </div>
  )
}

type RankItem = {
  intra_id: string;
  intra_picture: string;
  rank: number;
};

type RankItemProps = {
  userDetails: RankItem
};

export function Rank(props: RankItemProps) {
  let content;
  const { userDetails } = props;

  if (userDetails.rank === 1) {
    content = <div className="card_123" id="card_1st">
      <div className="centered-container">
        <div>
          <span className="bold_text">Rank </span>
          <span>#{userDetails.rank}</span>
        </div>
        <img className="rank_picture_1 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
        <div>
          <p>{userDetails.intra_id}</p>
        </div>
      </div>
    </div>;
  } else if (userDetails.rank === 2 || userDetails.rank === 3) {
    content = <div className="card_123" id="card_2nd_3rd">
      <div className="centered-container">
        <div>
          <span className='bold_text'>Rank </span>
          <span>#{userDetails.rank}</span>
        </div>
        <img className="rank_picture_2_3 rounded-circle" src={userDetails.intra_picture} alt="intra picture"/>
        <div>
          <p>{userDetails.intra_id}</p>
        </div>
      </div>
    </div>
  } else if (userDetails.rank >= 4) {
    content = <div className="card_4" id="card_4th">
      <div className="left-section">
        <img className="rank_picture_4 rounded-circle" src={userDetails.intra_picture} alt="intra picture" />
        <span>{userDetails.intra_id}</span>
      </div>
      
      <div className="right-section">
        <span className="bold_text">Rank </span>
        <span className="space">#{userDetails.rank}</span>
      </div>
    </div>
  } else {
    content = null; // 위의 조건 중 어떤 것도 만족하지 않을 때 반환할 내용
  }
  return content;
}

type RankInfo = {
  rank_1: RankItem; 
  rank_2: RankItem; 
  rank_3: RankItem; 
  rank_4: RankItem; 
  rank_5: RankItem; 
  rank_6: RankItem; 
};

export function RankLayout(props: RankInfo) {
  const data = props;
  return (
    <div className="row" style={{margin: '0px'}}>
      <div className="col-2 d-none d-xl-block" style={{width: '270px'}}>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="vote"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="rank"></Button>
        </div>
      </div>

      <div className="col">
        <div className="row">
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_2}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_1}></Rank>
          </div>
          <div className="col d-flex align-items-end justify-content-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_3}></Rank>
          </div>
          <div className="col-2 d-none d-xl-block"></div>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_4}></Rank>
          </div>
          <Blank name="main"></Blank>
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_5}></Rank>
          </div>
          <Blank name="main"></Blank>
          <div className="col-xl-10 d-flex justify-content-center align-items-center" style={{padding: '0px'}}>
            <Rank userDetails={data.rank_6}></Rank>
          </div>
          <Blank name="main"></Blank>
        </div>
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
            <Copyright></Copyright>
          </div>
          <Blank name="main"></Blank>
        </div>
      </div>
    </div>
  )
}