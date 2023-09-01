// import type { NotificationResponse } from "../../../components/topbar"
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let voteId = req.query.id?.toString();
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
  if (voteId === undefined) {
    res.status(400).end();
  }
  if (req.method === 'POST') {
    // console.log("req.body", req.body)
    const resp = await fetch(process.env.FETCH_URL+`notification`, {
      method: 'POST',
      headers: userId ? { "Content-Type": "application/json", "user-id": userId} : {},
      body: JSON.stringify(req.body),
    });
    if (resp.status !== 200)
      res.status(400).end();
    res.status(200).end();
  }
}


// export async function post_Notification(url : string, notiInfo : NotificationResponse) {
//     let userId = notiInfo.user_sub;
//     //console.log("postredy", notiInfo)
//     return await fetch(url, {
//       method: "POST",
//       // headers: {"user-id" : "141408"},
//       headers: userId ? { "user-id": userId } : {},
//       body: JSON.stringify({}),
//   }).catch((error) => console.log(error))
// }