import { Button } from "./button";
import { Copyright } from './Components';
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const renderTime = ({ remainingTime } : any) => {
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

export function RewardLayout() {
  const [redirect, setRedirect] = useState(false)
  //settimeout 3초 후에 redirect true로 바꾸기
  useEffect(() => {
    if (redirect) {
      if (process.env.NEXT_PUBLIC_ENV === "production") {
        window.location.href = "https://42tape.com/vote"
      } else {
        window.location.href = "http://localhost:3000/vote"
      }
    }
  }, [redirect])
  return (
    <div className="row" style={{margin: '0px'}}>
      <div className="col-2 d-none d-xl-block">
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="vote"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="rank"></Button>
        </div>
        {/* <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
          <Button name="reward"></Button>
        </div> */}
      </div>
      <div className="col">
        <div className="row">
          <div className="col-xl-10 d-flex justify-content-center align-items-center">
              <h1 id="reward_title">&#127873; 42 TAPE Reward List &#127873;</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-5 d-flex justify-content-center align-items-center">
            <div className="reward_tile">
              <h2 className="reward_rank">Rank 1 ~ 3 &#127829;</h2>
              <p className="reward_item centered-container">도미노피자 : 슈퍼디럭스 L + 콜라 1.25L</p>
              <div className="d-flex align-items-center justify-content-center">
                <img className="reward_img" src="/pizza.png" alt="pizza_img"></img>
              </div>
            </div>
          </div>
          <div className="col-xl-5 d-flex justify-content-center align-items-center">
            <div className="reward_tile">
              <h2 className="reward_rank">15명 무작위 랜덤 추첨! &#x1F91E;</h2>
              <p className="reward_item centered-container">컴포즈커피 : 아메리카노(Ice) 2잔</p>
              <div className="d-flex align-items-center justify-content-center">
                <img className="reward_img" src="/coffee.png" alt="coffee_img"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{margin: '0px'}}>
          <div className="col-xl-12 d-flex justify-content-center align-items-center">
            <Copyright></Copyright>
          </div>
        </div>
      </div>
      <div className="col-2 d-none d-xl-block">
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={["#6181ff", "#4fc3f7", "#e3f2fd"]}
            colorsTime={[10, 5, 0]}
            onComplete={() => setRedirect(true)}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
}