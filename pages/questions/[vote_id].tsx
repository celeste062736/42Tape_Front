import { TopBar } from "../../components/topbar";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { getToken } from "next-auth/jwt"
import AccessDenied from "../../components/access-denied";
import NonSSRWrapper from "../../components/noSSR";
import 'survey-core/defaultV2.min.css';
import { themeJson } from "../../survey";
import type { GetServerSideProps } from "next";

export const json = {
 "logoPosition": "right",
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat1",
     "title": "엄밀함?",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "showLabel": true,
     "multiSelect": true
    }
   ],
   "title": "q1"
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat2",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "showLabel": true,
     "multiSelect": true
    }
   ],
   "title": "q2"
  },
  {
   "name": "page3",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat3",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "showLabel": true,
     "multiSelect": true
    }
   ],
   "title": "q3"
  },
  {
   "name": "page4",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat4",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "showLabel": true,
     "multiSelect": true
    }
   ],
   "title": "q4"
  },
  {
   "name": "page5",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat5",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "showLabel": true,
     "multiSelect": true
    }
   ],
   "title": "q5"
  }
 ],
//  "cookieName": "questions",
 "showPageNumbers": true,
 "completeText": "Complete",
 "showPreviewBeforeComplete": "showAnsweredQuestions",
 "widthMode": "responsive"
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
  selected: boolean;
}

export interface CorrectorResult {
  "corrector_id": number;
  "selected": boolean;
}

interface StatsInput {
  [key: string]: string[];
}

interface Corr {
  corrector_id: number;
  [key: string]: number;
}

interface CorrProps {
  corrector_id: number;
  stat1: number;
  stat2: number;
  stat3: number;
  stat4: number;
  stat5: number;
}

function generateCorrectors(data: StatsInput): { correctors: any } {
  const statsMap: Map<number, { [key: string]: number }> = new Map();
  for (const statKey of Object.keys(data)) {
      for (const correctorIdStr of data[statKey]) {
          const correctorId = parseInt(correctorIdStr, 10);

          if (!statsMap.has(correctorId)) {
              // If the correctorId doesn't exist in the map, add it with default values
              statsMap.set(correctorId, {
                  corrector_id: correctorId,
                  stat1: 0,
                  stat2: 0,
                  stat3: 0,
                  stat4: 0,
                  stat5: 0
              });
          }

          const stats = statsMap.get(correctorId)!;  // Get existing stats for the corrector
          stats[statKey] += 1;  // Increment the particular stat for the corrector
      }
  }
  const correctors = Array.from(statsMap.values());
  return { correctors };
}

async function saveSurveyData(url : string, correctorProps: CorrProps[]) {
  console.log("fetch", correctorProps)
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(correctorProps),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((error) => console.log(error))
}

export default function Vote(props : {choices: Choices[], voteId: number}) {
  if (props.choices[0].value === "unknown") {
    return (
      <div id="root">
        <TopBar></TopBar>
        <AccessDenied></AccessDenied>
      </div>
    )
  }
  for (const page of json.pages) {
    page.elements[0].choices = props.choices;
  }
  const survey = new Model(json);
  survey.applyTheme(themeJson);
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 2));
    console.log("sender.data", sender.data)
    const { correctors } = generateCorrectors(sender.data);
    // const correctorProps = generateSurvey(props.choices, {vote_user: sender.data.vote_user});
    saveSurveyData(`/api/save-survey/${props.voteId}`, correctors);
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
  choices: Choices[], voteId: number
}> = async ({ req, res, params }) => {
  const dataUnknown : Choices[] = [
    {
      "value": "unknown",
      "text": "unknown",
      "imageLink": "unknown",
    }
  ]
  const token = await getToken({req})
  if (!token) {
    return { props : {choices: dataUnknown, voteId: -1} }
  }

  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  if (params === undefined) {
    return { props : {choices: dataUnknown, voteId: -1} }
  }
  let pid = params.vote_id;
  if (pid === undefined) {
    return { props : {choices: dataUnknown, voteId: -1} }
  }
  let voteId = parseInt(pid.toString(), 10);
  const resp = await fetch(`http://localhost:8080/vote/${voteId}`, {
    headers: userId ? { "user-id": userId } : {},
  });
  const data = await resp.json();
  const getData : Corrector[] = await data.correctors.map((corrector : any) => ({
    corrector_id: corrector.corrector_id,
    intra_login: corrector.intra_login,
    intra_picture: corrector.intra_picture,
    comment: corrector.comment,
    selected: corrector.selected,
  }));
  //filter result if selected is true
  let result = getData.filter((corrector: Corrector) => corrector.selected === true);
  let choices = await result.map((corrector: Corrector) => ({
    "value": corrector.corrector_id,
    "text": corrector.intra_login,
    "imageLink": corrector.intra_picture,
  }));
  console.log("choices:", choices)
  return { props: {choices: choices, voteId: voteId}}
}