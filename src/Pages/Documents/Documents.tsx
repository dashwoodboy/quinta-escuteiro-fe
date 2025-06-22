import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {listDocumentsPublic, openDocument} from "../../Services/DocumentService";
import { useQuery } from "@tanstack/react-query";
import {Loading} from "../../Components/Loading/Loading";
import React from "react";
import {Document} from "../../Models/Document";

export function Documents() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isPending, error, data } = useQuery<Document[]>({
    queryKey: ['documentsList '],
    queryFn: async () => await listDocumentsPublic()
  })

  const content = () => {
    if (isPending) {
      return(
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#ffffff"/>
        </div>
      )
    } else if (data) {
      return (
        <div className="w-full flex flex-col gap-y-4 overflow-y-auto px-8 flex-1 pb-8">
          {data.map(it => (
            <div
              className={`w-full flex px-8 py-4 rounded-lg shadow-xl cursor-pointer bg-white hover:bg-opacity-80`}
              key={it.id}
              onClick={() => openDocument(it.id)}
            >
              <p className="font-bold w-1/2">{it.name}</p>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <p>{t("errorAdmin")}</p>
        </div>
      )
    }
  }

  return (
    <div className="w-full  bg-primary flex flex-col">
      <h1 className="font-extrabold text-white text-3xl pt-4 pb-4 pl-8">{t("documents")}</h1>
      {content()}
    </div>
  )
}
