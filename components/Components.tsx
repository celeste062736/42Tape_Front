"use client";
// import Link from 'next/link'
import React from 'react';
import type { Coordinate } from './chart';

import { RadarChart, LineChart } from './chart';
import { Profile } from './profile';
import { Button } from './button';
import { Blank } from './blank';

export interface ClientTapeUser {
  user_id: string;
  number_votes: number;
  need_vote: boolean;
  number_notifications: number;
  need_notify: boolean;
  candidate_for_reward: boolean;
  is_activated: boolean;
}

export interface TargetTapeUser {
  login: string;
  first_name: string;
  last_name: string;
  intra_picture: string;
  level: number;
  current_season_rank: string;
}

export interface Season {
  season_id: number;
  start_at: string;
  end_at: string;
}

export interface TargetUserStats {
  cumulative_stat1: number;
  cumulative_stat2: number;
  cumulative_stat3: number;
  cumulative_stat4: number;
  cumulative_stat5: number;
  season: Season;
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface Repo {
  clientTapeUser: ClientTapeUser;
  targetTapeUser: TargetTapeUser;
  targetUserStats: TargetUserStats;
  yData: DataPoint[];
  xLabels: string[][];
}

export interface UserInfo {
  intra_pic: string;
  level: number;
  user_id: string | null;
  stats: number[];
  current_rank: string;
  yData: Coordinate[];
  xLabels: string[][];
  sub: string;
  is_active: boolean;
};

export interface UserInfoProps {
  userInfo : UserInfo;
}

export const MainLayout = ({ userInfo } : UserInfoProps) => {

  if (userInfo.user_id === null) {
    userInfo.user_id = 'unknown'
  }

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
          <div className="col-xl-5 d-flex justify-content-center align-items-center">
            <a id="intra_link" href={`https://profile.intra.42.fr/users/${userInfo.user_id}`} target="_blank" rel="noreferrer">Intra</a>
          </div>
        </div>
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
            <LineChart yData={userInfo.yData} xLabels={userInfo.xLabels}></LineChart>
          </div>
          <Blank name="main"></Blank>
        </div>
      </div>
      <div className="row" style={{margin: '0px'}}>
        <div className="col-xl-12 d-flex justify-content-center align-items-center">
          <Copyright></Copyright>
        </div>
      </div>
    </div>
  )
}

export function Copyright() {
  return (
    <div id="copyright">
      @2023 all 42 TAPE
    </div>
  )
}