import React from "react";
import {useTranslation} from "react-i18next";
import {Loading} from "../../../Components/Loading/Loading";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints, REACT_APP_API_LOCATION} from "../../../Constants/ApiEndpoints";
import {Activity} from "../../../Models/Activity";
import {useNavigate} from "react-router-dom";

export function ActivitiesList() {

  const { isPending, error, data } = useQuery<Activity[]>({
    queryKey: ['activitiesList'],
    queryFn: () =>
      fetch(`${REACT_APP_API_LOCATION}${ApiEndpoints.ALL_ACTIVITIES}`).then((res) =>
        res.json(),
      ),
  })

  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const activities = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#0D6054"/>
        </div>
      )
    } else if (error){
      return (
        <div className="w-full h-full flex justify-center items-center">
          <p>{t("errorAdmin")}</p>
        </div>
      )
    } else {
      return (
        <div className="h-full max-h-full overflow-y-auto">
          <div className="w-full flex px-12">
            <h1 className="font-extrabold text-white w-5/6">{t("activity_name")}</h1>
            <h1 className="font-extrabold text-white w-1/6 -ml-8">{t("activity_outside")}</h1>
          </div>
          <div className="w-full flex flex-col gap-y-4 overflow-y-auto px-8 flex-1 pb-8 pt-4">
            {data.map(it => (
              <div
                className={`w-full flex px-8 py-4 rounded-lg shadow-xl cursor-pointer hover:bg-opacity-80 bg-white`}
                onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITIESVIEW.replace(":id", it.activityId.toString()))}
                key={it.activityId}
              >
                <p className="font-bold w-5/6">{i18n.language === "pt"? it.titlePt : it.titleEn}</p>
                <p className="w-1/6">{t(it.outside? "yes" : "no")}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full bg-primary flex flex-col">
      <div className="w-full flex pb-8 pt-8 px-8 justify-between ">
        <h1 className="font-extrabold text-white text-3xl">{t("activities")}</h1>
        <button
          className="px-4 py-2 rounded-lg bg-white  shadow-2xl hover:bg-secondary hover:text-white font-bold"
          onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITIESCREATE)}
        >
          {t("create_activity")}
        </button>
      </div>
      {activities()}
    </div>
  )
}
