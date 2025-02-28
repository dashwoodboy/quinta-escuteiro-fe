import React, {useEffect, useState} from "react";
import {AdvancedImage} from "@cloudinary/react";
import {getCdnImage} from "../../Services/ImagesService";
import {IMAGES_ID} from "../../Constants/ImagesIds";
import {Activity} from "../../Models/Activity";
import { ActivityCard } from "./Avtivity/ActivityCard";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import {useTranslation} from "react-i18next";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";
import {useNavigate} from "react-router-dom";
import {Loading} from "../../Components/Loading/Loading";


export function Activities() {

  const { t } = useTranslation()
  const navigate = useNavigate()

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
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#0D6054"/>
        </div>
      )
    } else if (error) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-8">
          <p className="font-bold text-primary">{t("error_loading_activity")}</p>
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.ROOT)}
          >
            {t("return")}
          </button>
        </div>
      )
    } else {
      return data.map(activity => (
        <ActivityCard activity={activity}/>
      ))
    }
  }

  return (
    <div className=" w-full  bg-primary flex">
      <div className="lg:w-1/2 w-full h-full flex pr-4 flex-col">
        <h1 className="font-extrabold text-white text-3xl pl-8 py-6">{t('activities')}</h1>
        <div className="w-full h-full pb-8 pl-8 pr-4 space-y-8 overflow-y-auto scrollbar">
          {content()}
        </div>
      </div>

      <div className="w-1/2 lg:block hidden">
        <img src="https://daplstorage.zapto.org:9002/api/v1/buckets/quintaescuteiro/objects/download?preview=true&prefix=torre.jpg&version_id=null" alt="activities"/>
      </div>
    </div>
  );
}
