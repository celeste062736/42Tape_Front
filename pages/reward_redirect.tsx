import { TopBar } from '../components/topbar'
import React, { useEffect, useState, useRef } from 'react'
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

export default function reward() {
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
    <div id="root">
      <TopBar></TopBar>
      <h1>
        CountdownCircleTimer
        <br />
        React Component
      </h1>
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
  );
}