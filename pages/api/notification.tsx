import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

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
    const resp = await fetch(`http://localhost:8080/notication`, {
      method: 'GET',
      headers: userId ? { "user-id": userId } : {},
    });
    if (resp.status !== 200)
      res.status(400).end();
    res.status(200).end();
  }
}