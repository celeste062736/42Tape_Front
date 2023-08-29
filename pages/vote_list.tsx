import { TopBar } from "../components/topbar";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { getToken } from "next-auth/jwt"
import AccessDenied from "../components/access-denied";
import NonSSRWrapper from "../components/noSSR";
import 'survey-core/defaultV2.min.css';
import type { GetServerSideProps } from "next";

export const json = {
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "imagepicker",
      "name": "vote_user",
      "title": "How is the best corrector?",
      "hideNumber": true,
      "choices": [] as Choices[],
      "choicesOrder": "random",
      "showLabel": true,
      "multiSelect": true
     }
    ],
    "title": "pick_cadets"
   }
  ],
  "showCompletedPage": false,
  "navigateToUrl": "http://localhost:3000/questions",
  "completeText": "Start voting!",
 }

 interface Choices {
  "value": string;
  "text": string;
  "imageLink": string;
}

 interface Corrector {
  corrector_id: string;
  intra_login: string;
  intra_picture: string;
  comment: string;
}

interface VoteUser {
  "vote_user": string[];
}

export interface CorrectorResult {
  "corrector_id": number;
  "selected": boolean;
}

interface CorrectorProps {
  "correctors": CorrectorResult[];
}

function generateCorrectors(choices: Choices[], voteData: VoteUser): { correctProps: CorrectorProps } {
  const voteSet = new Set(voteData.vote_user.map(str => parseInt(str, 10)));
  const correctors: CorrectorResult[] = choices.map(choice => ({
      corrector_id: Number(choice.value),
      selected: voteSet.has(Number(choice.value))
  }));
  const correctProps : CorrectorProps = { correctors };
  return { correctProps: correctProps };
}

async function saveSurveyData(url : string, correctorProps: CorrectorProps) {
  console.log("fetch", correctorProps)
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(correctorProps),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((error) => console.log(error))
}

export default function Vote(props : {choices: Choices[], votdId: number}) {
  if (props.choices[0].value === "unknown") {
    return (
      <div id="root">
        <TopBar></TopBar>
        <AccessDenied></AccessDenied>
      </div>
    )
  }
  json.pages[0].elements[0].choices = props.choices;
  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 2));
    const correctorProps = generateCorrectors(props.choices, {vote_user: sender.data.vote_user});
    saveSurveyData(`/api/save-vote-user/${props.votdId}`, correctorProps.correctProps);
  });
  return (
    <div id="root">
        <TopBar></TopBar>
        <NonSSRWrapper>
          <Survey model={survey}></Survey>
        </NonSSRWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  choices: Choices[], votdId: number
}> = async ({ req, res }) => {
  const dataUnknown : Choices[] = [
    {
      "value": "unknown",
      "text": "unknown",
      "imageLink": "unknown",
    }
  ]
  const token = await getToken({req})
  if (!token) {
    return { props : {choices: dataUnknown, votdId: -1} }
  }

  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  let pid = 18364;
  const resp = await fetch(`http://localhost:8080/vote/${pid}`, {
    headers: userId ? { "user-id": userId } : {},
  });
  const data = await resp.json();
  const result : Corrector[] = data.correctors.map((corrector : any) => ({
    corrector_id: corrector.corrector_id,
    intra_login: corrector.intra_login,
    intra_picture: corrector.intra_picture,
    comment: corrector.comment,
  }));
  let choices = result.map((corrector: Corrector) => ({
    "value": corrector.corrector_id,
    "text": corrector.intra_login,
    "imageLink": corrector.intra_picture,
  }));
  console.log("choices:", choices)
  return { props: {choices: choices, votdId: pid}}
}



// const [correctors, setCorrectors] = useState<string | null>(null);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const id = 8363;
//       const res = await fetch(`/api/vote/${id}`)
//       data = await res.json()
//       if (data && data.correctors) {
//         setCorrectors(JSON.stringify(data.correctors));
//       }
//     } catch(error) {
//       console.error(error)
//     }
//   }
//   fetchData();
// }, []);
