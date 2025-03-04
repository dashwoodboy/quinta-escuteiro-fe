import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints, REACT_APP_API_LOCATION} from "../../../Constants/ApiEndpoints";
import {Loading} from "../../../Components/Loading/Loading";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {Infrastructure} from "../../../Models/Infrastructure";

export function InfrastructuresList() {

  const { isPending, error, data } = useQuery<Infrastructure[]>({
    queryKey: ['infrastructureList'],
    queryFn: () =>
      fetch(`${REACT_APP_API_LOCATION}${ApiEndpoints.ALL_INFRASTRUCTURES}`).then((res) =>
        res.json(),
      ),
  })

  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const infrastructures = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#"/>
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
          <div className="w-full flex px-16">
            <h1 className="font-extrabold text-white w-1/2">{t("infrastructure")}</h1>
          </div>
          <div className="w-full flex flex-col gap-y-4 overflow-y-auto px-8 flex-1 pb-8">
            {data.map(it => (
              <div
                className={`w-full flex px-8 py-4 rounded-lg shadow-xl cursor-pointer hover:bg-opacity-80 bg-white`}
                onClick={() => navigate(ROUTER_APP_PATHS.INFRASTRUCTURESVIEW.replace(":id", it.infrastructureId))}
                key={it.infrastructureId}
              >
                <p className="font-bold w-1/2">{i18n.language === "pt"? it.infrastructureNamePt : it.infrastructureNameEn}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full bg-primary flex flex-col">
      <div className="w-full flex pb-8 pt-2 px-8 justify-between items-center">
        <h1 className="font-extrabold text-white text-3xl pt-6">{t("infrastructures")}</h1>
        <button
          className="px-4 py-2 rounded-lg bg-white  shadow-2xl hover:bg-secondary hover:text-white font-bold"
          onClick={() => navigate(ROUTER_APP_PATHS.INFRASTRUCTURESCREATE)}
        >
          {t("create_infrastructures")}
        </button>
      </div>
      {infrastructures()}
    </div>
  )
}
