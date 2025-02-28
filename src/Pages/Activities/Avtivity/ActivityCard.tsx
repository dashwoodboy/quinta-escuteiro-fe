import React, {useEffect} from "react";
import {AdvancedImage} from "@cloudinary/react";
import {getCdnImage} from "../../../Services/ImagesService";
import {Activity} from "../../../Models/Activity";
import {useTranslation} from "react-i18next";
import AWS from 'aws-sdk';
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {S3CONSTANTS} from "../../../Constants/S3Constants";
import {getActivityImageId} from "../../../Services/ActivityService";
import {useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard(activityProps: ActivityCardProps) {

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const {activityId, titlePt, titleEn, smallMessagePt, smallMessageEn, messageEn, messagePt, outside, icon} = activityProps.activity

  return (
    <div
      key={activityId}
      className="w-full bg-white rounded-lg drop-shadow-2xl bg-opacity-65 hover:bg-opacity-30 flex cursor-pointer"
      onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITY.replace(":id", activityId))}
    >
      <div className="bg-white lg:w-2/5 w-full h-80 rounded-lg shadow-[rgba(0,0,0.1,0.1)_4px_0px_2px_0px] flex flex-col items-center">
        <ImageCdn imageName={getActivityImageId(activityProps.activity.icon)} className="w-full h-3/4 rounded-t-lg"/>
        <h1 className="text-primary font-bold h-1/4 flex items-center justify-center text-center  text-xl">
          {i18n.language === 'pt'? titlePt : titleEn}
        </h1>
      </div>
      <div className="lg:w-3/5 lg:block hidden px-6 py-4 max-h-64">
        <h2 className="text-primary font-bold text-xl">
          {t("about_activity")}
        </h2>
        <p className="w-full h-full overflow-y-auto scrollbar pt-2">{i18n.language === 'pt'? smallMessagePt : smallMessageEn}</p>
      </div>
    </div>
  );
}
