import { TopBar } from "../../components/topbar";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { getToken } from "next-auth/jwt"
import NonSSRWrapper from "../../components/noSSR";
import 'survey-core/defaultV2.min.css';
import { themeJson } from "../../survey";
import type { GetServerSideProps } from "next";
import type { NotificationResponse } from "../../components/topbar"
import { useState, useEffect } from "react";

export const json = {
 "logoPosition": "right",
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat1",
     "title": "1. 엄밀하게 평가해주신 분들을 모두 선택하세요.",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "hideNumber": true,
     "showLabel": true,
     "multiSelect": true
    }
   ],
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat2",
     "title": "2. 건설적인 제안을 해주신 분들을 모두 선택하세요.",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "hideNumber": true,
     "showLabel": true,
     "multiSelect": true
    }
   ],
  },
  {
   "name": "page3",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat3",
     "title": "3. 의사 소통 능력이 좋으신 분들을 모두 선택하세요.",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "hideNumber": true,
     "showLabel": true,
     "multiSelect": true
    }
   ],
  },
  {
   "name": "page4",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat4",
     "title": "4. 퀄리티 높은 질문을 해주신 분들을 모두 선택하세요.",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "hideNumber": true,
     "showLabel": true,
     "multiSelect": true
    }
   ],
  },
  {
   "name": "page5",
   "elements": [
    {
     "type": "imagepicker",
     "name": "stat5",
     "title": "5. 양질의 정보를 공유해주신 분들을 모두 선택하세요.",
     "choices": [] as Choices[],
     "imageFit": "cover",
     "hideNumber": true,
     "showLabel": true,
     "multiSelect": true
    }
   ],
  }
 ],
 "showPageNumbers": true,
 "completeText": "Complete",
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

async function saveSurveyData(url : string, correctors: CorrProps[]) {
   console.log("fetch", correctors)
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({correctors}),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((error) => console.log(error))
}

export default function Vote(props : {choices: Choices[], voteId: number, notiInfo: NotificationResponse}) {
  const [description, setDescription] = useState("엄밀함: 과제에서 지켜야하는 요구사항과 학습해야하는 최소한의 개념을 제대로 이해했는지 엄격하게 확인하였는가?");
  const [survey, setSurvey] = useState<Model | null>(null);

  useEffect(() => {
    for (const page of json.pages) {
      page.elements[0].choices = props.choices;
    }
    
    const newSurvey = new Model(json);
    newSurvey.applyTheme(themeJson);

    newSurvey.onComplete.add((sender, options) => {
      const { correctors } = generateCorrectors(sender.data);
      saveSurveyData(`/api/save-survey/${props.voteId}`, correctors);
    });

    newSurvey.onCurrentPageChanged.add((sender, options) => {
      console.log("Current Page:", sender.currentPageNo, sender.currentPage.name);
      switch(sender.currentPageNo) {
        case 0:
          setDescription("엄밀함: 과제에서 지켜야하는 요구사항과 학습해야하는 최소한의 개념을 제대로 이해했는지 엄격하게 확인하였는가?");
          break;
        case 1:
          setDescription("건설적인 제안: 과제의 수준을 높일 수 있는 방법이나 다른 방향성을 제시하였는가?");
          break;
        case 2:
          setDescription("의사 소통 능력: 상대방의 디펜스 논리를 존중하며 비판적인 평가를 진행했는가?");
          break;
        case 3:
          setDescription("질문 퀄리티: 질문을 통해서 놓칠 수 있는 부분 및 피평가자가 모호하게 설명하는 내용을 짚어주었는가?");
          break;
        case 4:
          setDescription("정보 공유: 부족한 점을 보완할 수 있는 자료나 추가적으로 좋은 정보를 공유하였는가?");
          break;
        default:
          setDescription("엄밀함: 과제에서 지켜야하는 요구사항과 학습해야하는 최소한의 개념을 제대로 이해했는지 엄격하게 확인하였는가?");
          break;
      }
    });
    setSurvey(newSurvey);  // 상태 업데이트
  }, []); // 빈 dependency 배열을 사용하여 컴포넌트가 마운트될 때만 실행

  useEffect(() => {
    const bootstrap = require('bootstrap');  // 클라이언트 사이드에서만 import
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }, [description, []]);  // description 상태가 바뀔 때마다 툴팁을 다시 초기화, 빈 배열을 추가하여 페이지가 처음 렌더링될 때 초기화

  if (!survey) {
    return <div>Loading...</div>;
  }
  
  console.log("description:", description);
  return (
    <div id="root">
        <TopBar NotiInfo={ props.notiInfo }></TopBar>
        <div id="survey" className="col">
          <div className="row d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
              <path data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title={description} d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
            </svg>
          </div>
          <div className="row">
            <NonSSRWrapper>
              <Survey model={survey}></Survey>
            </NonSSRWrapper>
          </div>
        </div>
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
  const resp = await fetch(process.env.FETCH_URL+`vote/${voteId}`, {
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


  const resp2 = await fetch(process.env.FETCH_URL+'notification', {
    method: "GET",
    headers: userId ? { "user-id": userId } : {}
  })
  const repo2 : NotificationResponse = await resp2.json()

  const NotiInfo : NotificationResponse = {
    user_sub:  String(token.sub),
    receiver: repo2.receiver,
    number_notifications: repo2.number_notifications,
    need_notify: repo2.need_notify,
    notificationList: repo2.notificationList,
  }
  return { props: {choices: choices, voteId: voteId, notiInfo: NotiInfo}}
}