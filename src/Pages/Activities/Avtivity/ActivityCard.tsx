import React from "react";
import {AdvancedImage} from "@cloudinary/react";
import {getCdnImage} from "../../../Services/ImagesService";
import {Activity} from "../../../Models/Activity";
import {useTranslation} from "react-i18next";

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard(activityProps: ActivityCardProps) {

  const { i18n, t } = useTranslation();
  const {activityId, titlePt, titleEn, messageEn, messagePt, outside, icon} = activityProps.activity

  const activityImage = getCdnImage(icon);

  return (
    <div key={activityId} className="w-full bg-white rounded-lg drop-shadow-2xl bg-opacity-65 flex">
      <div className="bg-white w-1/3 h-72 rounded-lg shadow-[rgba(0,0,0.1,0.1)_4px_0px_2px_0px] flex flex-col items-center">
        <AdvancedImage cldImg={activityImage} className="w-60 h-52 rounded-t-lg"/>
        <h1 className="text-primary font-bold h-full flex items-center text-xl">
          {i18n.language === 'pt'? titlePt : titleEn}
        </h1>
      </div>
      <div className="w-2/3 px-6 py-4 max-h-64">
        <h2 className="text-primary font-bold text-xl">
          {t("about_activity")}
        </h2>
        <p className="w-full h-full overflow-y-auto scrollbar pt-2">{i18n.language === 'pt'? messagePt : messageEn}</p>
      </div>
    </div>
  );
}
