import type { NextApiRequest, NextApiResponse } from 'next';

type Corrector = {
  corrector_id: string;
  intra_login: string;
  intra_picture: string;
  comment: string;
}

interface VoteData {
  correctors: Corrector[];
}

export default async function GET(req: NextApiRequest, { params } : { params : {id: string}}, res: NextApiResponse) {
  if (req.method === 'GET') {
    const resp = await fetch("http://localhost:8080/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-id" : params.id,
      },
    });
    if (resp.status !== 200)
      return res.status(400).end();
    const data = await resp.json();
    const result : Corrector[] = data.correctors.map((corrector : any) => ({
      corrector_id: corrector.corrector_id,
      intra_login: corrector.intra_login,
      intra_picture: corrector.intra_picture,
      comment: corrector.comment,
    }));
    res.status(200).json(result);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}