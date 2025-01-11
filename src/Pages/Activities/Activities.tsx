import React, {useEffect, useState} from "react";
import {AdvancedImage} from "@cloudinary/react";
import {getCdnImage} from "../../Services/ImagesService";
import {IMAGES_ID} from "../../Constants/ImagesIds";
import {Activity} from "../../Models/Activity";
import { ActivityCard } from "./Avtivity/ActivityCard";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import * as Minio from 'minio'

const dataMock: Activity[] = [
  {
    "activityId": "08dd25a3-a2b2-4013-8c89-4d9cdc64a4d6",
    "titlePt": "Teste Atividade",
    "titleEn": "Test Activity",
    "messagePt": "Isto e uma atividade de teste",
    "messageEn": "This is a test activity",
    "outside": true,
    "icon": "sdadsaljdslkajdlksjlda"
  },
  {
    "activityId": "08dd25a3-a2b2-4013-8c89-4d9cdc64a4d6",
    "titlePt": "Teste Atividade",
    "titleEn": "Test Activity",
    "messagePt": "Isto e uma atividade de teste",
    "messageEn": "This is a test activity",
    "outside": true,
    "icon": "sdadsaljdslkajdlksjlda"
  },
  {
    "activityId": "08dd25a3-a2b2-4013-8c89-4d9cdc64a4d6",
    "titlePt": "Teste Atividade",
    "titleEn": "Test Activity",
    "messagePt": "Isto e uma atividade de teste",
    "messageEn": "This is a test activity",
    "outside": true,
    "icon": "sdadsaljdslkajdlksjlda"
  },
  {
    "activityId": "08dd25a3-a2b2-4013-8c89-4d9cdc64a4d6",
    "titlePt": "Teste Atividade",
    "titleEn": "Test Activity",
    "messagePt": "Isto e uma atividade de teste",
    "messageEn": "This is a test activity",
    "outside": true,
    "icon": "sdadsaljdslkajdlksjlda"
  }
]

export function Activities() {

  const s3Client = new Minio.Client({
    endPoint: 'https://192.168.1.113:9002',
    port: 9002,
    useSSL: true,
    accessKey: 'vwAJ9av929x9jsiUzusC',
    secretKey: '5PhDyXkFP3WDLokgbnN3rQ4h62ZchRWIEmeSqCvX',
  })

  const presignedUrl = s3Client.presignedUrl('GET', 'quintaescuteiro', 'torre.jpg')
  presignedUrl.then(it => console.log(it))


  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = "sdsds"
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const { isPending, error, data } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ALL_ACTIVITIES}`).then((res) =>
        res.json(),
      ),
  })

  const content = () => {
    if (isPending) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    } else if (error) {
      console.log(error)
    } else {
      return data.map(activity => (
        <ActivityCard activity={activity}/>
      ))
    }
  }

  return (
    <div className=" w-full  bg-primary flex">
      <div className="w-1/2 h-full flex flex-col">
        <h1 className="font-extrabold text-white text-3xl pl-8 py-6">Atividades</h1>
        <div className="w-full h-full pb-8 px-8 space-y-8 overflow-y-auto scrollbar">
          {content()}
        </div>
      </div>

      <div className="w-1/2">
        <img src="https://daplstorage.zapto.org:9002/quintaescuteiro/torre.jpg" alt="activities"/>
      </div>
    </div>
  );
}
