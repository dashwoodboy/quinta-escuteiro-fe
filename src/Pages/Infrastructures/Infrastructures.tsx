import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import {Infrastructure} from "../../Models/Infrastructure";
import {ImageCdn} from "../../Components/ImageCdn/ImageCdn";
import {InfrastructureCard} from "./Infrastructure/InfrastructureCard";
import {useTranslation} from "react-i18next";
import {Loading} from "../../Components/Loading/Loading";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";
import {useNavigate} from "react-router-dom";


export function Infrastructures() {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isPending, error, data } = useQuery<Infrastructure[]>({
    queryKey: ['infrastructures'],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ALL_INFRASTRUCTURES}`).then((res) =>
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
          <p className="font-bold text-primary">{t("error_loading_infrastructure")}</p>
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.ROOT)}
          >
            {t("return")}
          </button>
        </div>
      )
    } else {
      return data.map(infrastructure => (
        <InfrastructureCard infrastructure={infrastructure} />
      ))
    }
  }

  return (
    <div className=" w-full  bg-primary flex">
      <div className="w-1/2 h-full flex flex-col">
        <h1 className="font-extrabold text-white text-3xl pl-8 py-6">{t('infrastructures')}</h1>
        <div className="w-full h-full pb-8 px-8 space-y-8 overflow-y-auto scrollbar">
          {content()}
        </div>
      </div>

      <div className="w-1/2">
        <ImageCdn imageName={"host/infrastructure_create.jpg"} className="h-full w-full text-white"/>
      </div>
    </div>
  );
}
