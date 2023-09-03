import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import type { NotificationResponse } from '../../components/topbar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  let userId : string | undefined;
  if (token === null) {
    res.status(400).end();
    return;
  }
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  if (req.method === 'GET') {
    const data = await fetch(process.env.FETCH_URL+'notification', {
      method: 'GET',
      headers: userId ? { "Content-Type": "application/json", "user-id": userId} : {},
    });
    if (data.status !== 200)
    {
      res.status(400).end();
      return
    }
    const resp : NotificationResponse = await data.json()
    console.log('notification');
    console.log(token);
    console.log('notification');
    // notificationList에 데이터 수동으로 넣기
    // resp.notificationList = [
    //     {
    //         "type": "now_reward_candidate",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": false
    //     },
    //     {
    //         "type": "got_new_reward",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": true
    //     },
    //     {
    //         "type": "now_no_reward",
    //         "createdAt": "Mon Aug 28 2023",
    //         "notified": true
    //     }
    //   ]
    const notiInfo : NotificationResponse = {
      user_sub: String(token.sub),
      receiver: resp.receiver,
      number_notifications: resp.number_notifications,
      need_notify: resp.need_notify,
      notificationList: resp.notificationList,
    }
    res.status(200).json(notiInfo);
  } else if (req.method === 'POST') {
    const data = await fetch(process.env.FETCH_URL+'notification', {
      method: 'POST',
      headers: userId ? { "Content-Type": "application/json", "user-id": userId} : {},
      body: JSON.stringify({}),
    });
    if (data.status !== 200)
    {
      res.status(400).end();
      return
    }
    res.status(200).end();
  }
}