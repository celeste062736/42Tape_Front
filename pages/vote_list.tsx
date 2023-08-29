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
 }

 interface Choices {
  "value": string;
  "text": string;
  "imageLink": string;
}

 type Corrector = {
  corrector_id: string;
  intra_login: string;
  intra_picture: string;
  comment: string;
}

function saveSurveyData(survey : any) {

}

export default function Vote(props : {choices: Choices[]}) {
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
  choices: Choices[]
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
    return { props : {choices: dataUnknown} }
  }

  let userId : string | undefined;
  if(token.sub === null) {
    userId = undefined;
  } else {
    userId = token.sub;
  }
  let pid = 8362;
  const resp = await fetch(`http://localhost:8080/vote/${pid}`, {
    headers: { "user-id": "98029" }
  });
  const data = await resp.json();
  // console.log("data:", data)
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
    // console.log("result:", result)
  // const id = 8362;
  // const resp = await fetch(`http://localhost:3000/api/vote?id=${id}`)
  // const data : Corrector[] = await resp.json()
  // let choices = data.map((corrector: Corrector) => ({
  //   "value": corrector.corrector_id,
  //   "text": corrector.intra_login,
  //   "imageLink": corrector.intra_picture,
  // }));
  return { props: {choices: choices}}
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
