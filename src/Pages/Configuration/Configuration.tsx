import React from "react"
import {useTranslation} from "react-i18next";
import {faPenToSquare, faPersonWalking, faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAuth} from "firebase/auth"
import {Link, useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";

export function Configuration() {

  const { t } = useTranslation()
  const auth = getAuth()
  const navigate = useNavigate()

  const endSession =  () => {
    auth.signOut().then(it => {
      navigate(ROUTER_APP_PATHS.ROOT)
    })
  }

  return(
    <div className="w-full  bg-primary flex flex-col">
      <div className="w-full flex py-6 px-8 justify-between">
        <h1 className="font-extrabold text-white text-3xl">{t("staff")}</h1>
        <button
          className="px-4 py-2 rounded-lg bg-white shadow-2xl hover:bg-secondary hover:text-white font-bold"
          onClick={endSession}
        >
          {t("logout")}
        </button>
      </div>
      <div className="w-full px-8 pb-4 flex flex-wrap lg:gap-32 gap-20  lg:justify-start justify-center">
        <Link
          to={ROUTER_APP_PATHS.RESERVATIONIST}
          className="w-60 h-60 bg-white rounded-lg shadow-2xl flex items-center py-8 flex-col justify-between cursor-pointer hover:bg-secondary hover:text-white"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="4x"
            className="cursor-pointer mt-8"
          />
          <h1 className="text-xl font-bold cursor-pointer">{t("reservations")}</h1>

        </Link>
        <Link
          to={ROUTER_APP_PATHS.ACTIVITIESLIST}
          className="w-60 h-60 bg-white rounded-lg shadow-2xl flex items-center py-8 flex-col justify-between cursor-pointer hover:bg-secondary hover:text-white"
        >
          <FontAwesomeIcon
            icon={faPersonWalking}
            size="4x"
            className="cursor-pointer mt-8"
          />
          <h1 className="text-xl font-bold cursor-pointer">{t("activities")}</h1>
        </Link>
        <Link
          to={ROUTER_APP_PATHS.INFRASTRUCTURESLIST}
          className="w-60 h-60 bg-white rounded-lg shadow-2xl flex items-center py-8 flex-col justify-between cursor-pointer hover:bg-secondary hover:text-white"
        >
          <FontAwesomeIcon
            icon={faHouse}
            size="4x"
            className="cursor-pointer mt-8"
          />
          <h1 className="text-xl font-bold cursor-pointer">{t("infrastructures")}</h1>
        </Link>
      </div>
    </div>
  )
}
