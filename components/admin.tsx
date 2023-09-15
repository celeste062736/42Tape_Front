import { Button } from './button';
import { Copyright } from './Components';
import { season_reward_record } from '../pages/admin';
import { useState } from 'react';
// import './AdminLayout.css'; // 스타일 파일을 불러옵니다.

interface seasonRewardRecordLists {
  reward_data: season_reward_record[];
}

export function AdminLayout({ reward_data }: seasonRewardRecordLists) {
  return (
    <div>
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
            <div id="admin_season_reward_info" key={season_index} className="row">
              <div style={{ padding: '10px' }}>시즌 정보</div>
              <table id="admin_season_info" className="custom-table">
                <thead>
                  <tr>
                    <th scope="col">Season</th>
                    <th scope="col">Start at</th>
                    <th scope="col">End at</th>
                    <th scope="col">Reward End at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{season_item.season_id}</th>
                    <td>{season_item.start_at}</td>
                    <td>{season_item.end_at}</td>
                    <td>{season_item.reward_end_at}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ padding: '10px' }}>시즌 보상 정보</div>
              <div id="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th id="admin_user_id" scope="col">User ID</th>
                      <th id="admin_intra_id" scope="col">Intra ID</th>
                      <th id="admin_e-mail" scope="col">E-mail</th>
                      <th id="admin_reward" scope="col">Reward</th>
                      <th id="admin_ref_score" scope="col">score</th>
                      <th id="admin_blank" scope="col"></th>
                    </tr>
                  </thead>
                </table>
              {season_item.reward_list.map((reward_item, reward_index) => (
                <div key={reward_index} className="row" style={{ margin: '0'}}>
                  <table className="custom-table">
                    <tbody>
                      <tr style={{ backgroundColor: reward_item.reward === "ranking" ? "#FFDAAF" : "white"}}>
                        <td id="admin_user_id" className="text-center">{reward_item.user_id}</td>
                        <td id="admin_intra_id" className="text-center">{reward_item.login}</td>
                        <td id="admin_e-mail" className="text-center"><a href={"mailto:" + reward_item.email}>{reward_item.email}</a></td>
                        <td id="admin_reward" className="text-center">{reward_item.reward}</td>
                        <td id="admin_ref_score" className="text-center">{reward_item.ref}</td>
                        <td id="admin_blank" className="text-center" style={{backgroundColor: "white" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row" style={{ margin: '0px' }}>
        <div className="col-xl-12 d-flex justify-content-center align-items-center">
          <Copyright />
        </div>
      </div>
    </div>
  );
}




// import { Button } from './button';
// import { Copyright } from './Components';
// import { season_reward_record } from '../pages/admin';
// import { useState } from 'react';


// interface seasonRewardRecordLists {
//   reward_data: season_reward_record[];
// };

// export function AdminLayout({ reward_data }: seasonRewardRecordLists) {
//   return (
//     <div>
//       <div className="row" style={{ margin: '0px' }}>
//         <div className="col-2 d-none d-xl-block">
//           <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
//             <Button name="vote"></Button>
//           </div>
//           <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
//             <Button name="rank"></Button>
//           </div>
//           <div className="row d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
//             <Button name="reward"></Button>
//           </div>
//         </div>
//         <div className="col">
//           {reward_data.map((season_item, season_index) => (
//           <div id="admin_season_reward_info" key={season_index} className="row">
//             <div style={{padding:'10px'}}>시즌 정보</div>
//             <table id="admin_season_info">
//               <thead>
//                 <tr>
//                   <th scope="col">Season</th>
//                   <th scope="col">Start at</th>
//                   <th scope="col">End at</th>
//                   <th scope="col">Reward End at</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row">{season_item.season_id}</th>
//                   <td>{season_item.start_at}</td>
//                   <td>{season_item.end_at}</td>
//                   <td>{season_item.reward_end_at}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div style={{padding:'10px'}}>시즌 보상 정보</div>
//             {season_item.reward_list.map((reward_item, reward_index) => (
//             <div key={reward_index} className="row" style={{margin: "0"}}>
//               <table>
//                 <thead>
//                   <tr>
//                     <th scope="col">User ID</th>
//                     <th scope="col">Intra ID</th>
//                     <th scope="col">E-mail</th>
//                     <th scope="col">Reward</th>
//                     <th scope="col">ref_score</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">{reward_item.user_id}</th>
//                     <td>{reward_item.login}</td>
//                     <td><a href={"mailto:" + reward_item.email}>{reward_item.email}</a></td>
//                     <td>{reward_item.reward}</td>
//                     <td>{reward_item.ref}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             ))}
//           </div>
//           ))}
//         </div>
//       </div>
//       <div className="row" style={{margin: '0px'}}>
//         <div className="col-xl-12 d-flex justify-content-center align-items-center">
//           <Copyright />
//         </div>
//       </div>
//     </div>
//   )
// }
  