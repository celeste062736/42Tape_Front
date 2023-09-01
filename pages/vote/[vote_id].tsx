import { TopBar } from "../../components/topbar";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { getToken } from "next-auth/jwt"
import NonSSRWrapper from "../../components/noSSR";
import 'survey-core/defaultV2.min.css';
import type { GetServerSideProps } from "next";
import { themeJson } from "../../survey";
import type { NotificationResponse } from "../../components/topbar"
import { useEffect } from "react";
import { redirect } from "next/navigation";

export const json = {
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "imagepicker",
      "name": "vote_user",
      "title": "최고의 평가자들을 선택해주세요.",
      "hideNumber": true,
      "choices": [] as Choices[],
      "choicesOrder": "random",
      "showLabel": true,
      "multiSelect": true,
     },
    ],
   }
  ],
  "showCompletedPage": false,
  "navigateToUrl": "https://42tape.com/questions",
  "completeText": "Start voting!",
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
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(correctorProps),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((error) => console.log(error))
}

export default function Vote(props : {choices: Choices[], voteId: number, round_data: number[], notiInfo: NotificationResponse}) {
  useEffect(() => {
    const bootstrap = require('bootstrap');  // 클라이언트 사이드에서만 import

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }, []);
  if (props.choices[0].value === "unknown") {
    redirect('/signin')
  }
  json.pages[0].elements[0].choices = props.choices;
  json["navigateToUrl"] = `https://42tape.com/questions/${props.voteId}`
  const survey = new Model(json);
  survey.applyTheme(themeJson);
  survey.onValidateQuestion.add((sender, options) => {
    if (options.name === "vote_user") {
      if (options.value.length < props.round_data[0] || options.value.length > props.round_data[1]) {
        options.error = `You must select at least ${props.round_data[0]} correctors and at most ${props.round_data[1]} correctors!`;
      }
    }
  });
  survey.onComplete.add((sender, options) => {
    // console.log(JSON.stringify(sender.data, null, 2));
    const correctorProps = generateCorrectors(props.choices, {vote_user: sender.data.vote_user});
    saveSurveyData(`/api/save-vote-user/${props.voteId}`, correctorProps.correctProps);
  });
  return (
    <div id="root">
      <TopBar NotiInfo={ props.notiInfo }></TopBar>
      <NonSSRWrapper>
        <Survey model={survey}></Survey>
      </NonSSRWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  choices: Choices[], voteId: number, round_data: number[]
}> = async ({ req, res, params }) => {
  let round_data = new Array<number>(2);
  round_data[0] = -1;
  round_data[1] = -1;
  const dataUnknown : Choices[] = [
    {
      "value": "unknown",
      "text": "unknown",
      "imageLink": "unknown",
    }
  ]
  const token = await getToken({req})
  if (!token) {
    return { props : {choices: dataUnknown, voteId: -1 , round_data: round_data} }
  }
  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  if (params === undefined) {
    return { props : {choices: dataUnknown, voteId: -1 , round_data: round_data} }
  }
  let pid = params.vote_id;
  if (pid === undefined) {
    return { props : {choices: dataUnknown, voteId: -1 , round_data: round_data} }
  }
  let voteId = Number(pid.toString());
  const resp = await fetch(process.env.FETCH_URL+`vote/${voteId}`, {
    headers: userId ? { "user-id": userId } : {},
  });
  const data = await resp.json();
  round_data[0] = data.min_1st_round
  round_data[1] = data.max_1st_round
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



  const resp2 = await fetch(process.env.FETCH_URL+'notification', {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })
  const repo2 : NotificationResponse = await resp2.json()
  //notificationList에 데이터 수동으로 넣기
  // repo2.notificationList = [
  //   {
  //       "type": "got_new_vote",
  //       "createdAt": "Mon Aug 28 2023",
  //       "notified": false
  //   },
  //   {
  //       "type": "got_new_vote",
  //       "createdAt": "Mon Aug 28 2023",
  //       "notified": true
  //   },
  //   {
  //     "type": "got_new_vote",
  //     "createdAt": "Mon Aug 28 2023",
  //     "notified": true
  //   }
  // ]
  const NotiInfo : NotificationResponse = {
    user_sub:  String(token.sub),
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    need_notify: repo2.need_notify,
    notificationList: repo2.notificationList,
  }

  // console.log("choices:", choices)
  return { props: {choices: choices, voteId: voteId, round_data: round_data, notiInfo: NotiInfo}}
}
