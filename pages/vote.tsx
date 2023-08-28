"use client"
import { TopBar } from "../components/topbar";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useEffect, useState } from "react";
import NonSSRWrapper from "../components/noSSR";
import 'survey-core/defaultV2.min.css';

export const json = {
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "imagepicker",
      "name": "question4",
      "title": "가장 좋은 평가자?",
      "choices": [
       {
        "value": "Image 1",
        "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"
       },
       {
        "value": "Image 2",
        "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"
       },
       {
        "value": "Image 3",
        "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"
       },
       {
        "value": "Image 4",
        "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"
       }
      ],
      "choicesOrder": "random",
      "imageFit": "cover",
      "showLabel": true,
      "multiSelect": true
     }
    ],
    "title": "select_cadets"
   }
  ]
 }

export default function Vote() {
  const [correctors, setCorrectors] = useState<string | null>(null); // [Corrector
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 8363;
        const res = await fetch(`/api/vote/${id}`)
        const data = await res.json()
        if (data && data.correctors) {
          setCorrectors(JSON.stringify(data.correctors));
        }
        // You can delete the line below if you do not use a customized theme
        // survey.applyTheme(themeJson);
      } catch(error) {
        console.error(error)
      }
    }
    fetchData();
  }, []);
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
