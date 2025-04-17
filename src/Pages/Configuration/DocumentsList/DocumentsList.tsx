import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {deleteDocument, listDocuments, openDocument} from "../../../Services/DocumentService";
import {Loading} from "../../../Components/Loading/Loading";
import {Document} from "../../../Models/Document";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function DocumentsList() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isPending, error, data, refetch } = useQuery<Document[]>({
    queryKey: ['documentsList '],
    queryFn: async () => await listDocuments()
  })

  const removeDocument = async (id: string) => {
    await deleteDocument(id)
    await refetch()
  }

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
              className="flex space-x-4"
              key={it.id}
            >
              <div
                className={`w-full flex px-8 py-4 rounded-lg shadow-xl cursor-pointer bg-white hover:bg-opacity-80`}
                onClick={() => openDocument(it.id)}
              >
                <p className="font-bold w-1/2">{it.name}</p>
              </div>
              <div
                className={`px-8 py-4 rounded-lg shadow-xl cursor-pointer bg-red-400  hover:bg-red-500 flex justify-center items-center text-white`}

                onClick={async () => await removeDocument(it.id)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  size="xl"
                  className="cursor-pointer"
                />
              </div>
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
    <div className="w-full h-full bg-primary flex flex-col">
      <div className="w-full flex pb-8 pt-8 px-8 justify-between items-center">
        <h1 className="font-extrabold text-white text-3xl ">{t("documents")}</h1>
        <button
          className="px-4 py-2 rounded-lg bg-white  shadow-2xl hover:bg-secondary hover:text-white font-bold"
          onClick={() => navigate(ROUTER_APP_PATHS.DOCUMENTSADD)}
        >
          {t("add_document")}
        </button>
      </div>
      {content()}
    </div>
  )
}
