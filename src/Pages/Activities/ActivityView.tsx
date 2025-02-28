import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Infrastructure} from "../../Models/Infrastructure";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import {Activity} from "../../Models/Activity";
import {ImageCdn} from "../../Components/ImageCdn/ImageCdn";
import {getActivityImageId} from "../../Services/ActivityService";
import {Loading} from "../../Components/Loading/Loading";
import React from "react";
import {useTranslation} from "react-i18next";
import parse from 'html-react-parser';

export function ActivityView() {

  const { id } = useParams()
  const { t, i18n } = useTranslation()

  const { isPending, error, data } = useQuery<Activity>({
    queryKey: [`activity_${id}`],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ACTIVITY.replace("{id}", id ?? "")}`).then((res) =>
        res.json(),
      ),
  })

  const content = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex bg-primary justify-center items-center">
          <Loading color="#ffffff"/>
        </div>
      )
    } else if (error){
      return (
        <div className="w-full h-full flex justify-center items-center bg-primary">
          <p className="text-white">{t("errorAdmin")}</p>
        </div>
      )
    } else {
      return (
        <div className="w-full h-full flex bg-primary">
          <div className="w-1/2 h-full flex flex-col pl-8 pr-4 py-4">
            <p className="text-4xl font-bold text-white">{i18n.language === 'pt'? data?.titlePt : data?.titleEn}</p>
            <div className="w-full h-full pt-8 overflow-y-auto scrollbar pr-4 text-white text-justify">
              {parse(i18n.language === 'pt'? data?.messagePt : data?.messageEn)}
            </div>
          </div>
          <div className="w-1/2 h-full">
            <ImageCdn imageName={data.icon !== ""? getActivityImageId(data.icon) : data.icon} className="w-full h-full text-white"/>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full">
      {content()}
    </div>
  );
}
