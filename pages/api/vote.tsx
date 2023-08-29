import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Corrector = {
  corrector_id: string;
  intra_login: string;
  intra_picture: string;
  comment: string;
}

interface VoteData {
  correctors: Corrector[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let pid = req.query.id;
    const token = await getToken({ req });
    let userId : string | undefined;
    if (token === null) {
      return res.status(400).end();
    }
    if(token.sub === null) {
      userId = undefined;
    } else {
      userId = token.sub;
    }
    if (pid === undefined) {
      return res.status(400).end();
    }
    pid = pid.toString();
    if (req.method === 'GET') {
      const resp = await fetch(`http://localhost:8080/vote/${pid}`, {
        headers: { "user-id": "98029" }
      });
      if (resp.status !== 200)
        return res.status(400).end();
      const data = await resp.json();
      // console.log("data:", data)
      const result : Corrector[] = data.correctors.map((corrector : any) => ({
        corrector_id: corrector.corrector_id,
        intra_login: corrector.intra_login,
        intra_picture: corrector.intra_picture,
        comment: corrector.comment,
      }));
      // console.log("result:", result)
      res.status(200).json(result);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  
}