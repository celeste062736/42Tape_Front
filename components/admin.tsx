import { Button } from './button';
import { Copyright } from './Components';
import { season_reward_record } from '../pages/admin';
import { useState } from 'react';


interface seasonRewardRecordLists {
  reward_data: season_reward_record[];
};

export function AdminLayout({ reward_data }: seasonRewardRecordLists) {
  return (
    <div className="row" style={{ margin: '0px' }}>
      <div className="col-2 d-none d-xl-block">
        <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
          <Button name="vote"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
          <Button name="rank"></Button>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
          <Button name="reward"></Button>
        </div>
      </div>
      <div className="col">
        {reward_data.map((season_item, season_index) => (
        <div key={season_index} className="row">
          <div>{season_item.season_id}</div>
          <div>{season_item.start_at}</div>
          <div>{season_item.end_at}</div>
          <div>{season_item.reward_end_at}</div>
          {season_item.reward_list.map((reward_item, reward_index) => (
          <div key={reward_index} className="row">
            <div>{reward_item.user_id}</div>
            <div>{reward_item.login}</div>
            <div>{reward_item.email}</div>
            <div>{reward_item.reward}</div>
          </div>
          ))}
        </div>
        ))}
      </div>
      <div className="row" style={{margin: '0px'}}>
        <div className="col-xl-12 d-flex justify-content-center align-items-center">
          <Copyright />
        </div>
      </div>
    </div>
  )
}
  