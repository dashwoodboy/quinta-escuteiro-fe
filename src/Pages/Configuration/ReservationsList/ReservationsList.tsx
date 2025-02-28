import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints} from "../../../Constants/ApiEndpoints";
import {ReservationListItem} from "../../../Models/ReservationListItem";
import {Loading} from "../../../Components/Loading/Loading";
import {reservationsOptions} from "../../Reservation/Utils";
import dayjs from "dayjs";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import {reservationStates} from "../../../Constants/ReservationStates";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";

export function ReservationsList() {

  const [reservationFilter, setReservationFilter] = useState<string>("-1")

  const { isPending, error, data } = useQuery<ReservationListItem[]>({
    queryKey: ['reservationsList', reservationFilter],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.RESERVATION_LIST}${
        reservationFilter === "-1"? "" : "?reservationsStates=" + reservationFilter
      }`).then((res) =>
        res.json(),
      ),
  })

  const filter = (option: string) => {
    setReservationFilter(option)
  }

  const { t } = useTranslation()
  const navigate = useNavigate()

  const reservations = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#ffffff"/>
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
        <div className="h-full max-h-full overflow-y-scroll">
          <div className="w-full flex px-16">
            <h1 className="font-extrabold text-white w-1/2">{t("responsible_name")}</h1>
            <h1 className="font-extrabold text-white w-1/3">{t("reservation_type")}</h1>
            <h1 className="font-extrabold text-white w-1/6 whitespace-nowrap mr-4">{t("arrival_date")}</h1>
          </div>
          <div className="w-full flex flex-col gap-y-4 overflow-y-auto px-8 flex-1 pb-8">
            {data.map(it => (
              <div
                className={`w-full flex px-8 py-4 rounded-lg shadow-xl cursor-pointer hover:bg-opacity-80 ${it.state === 2? 'bg-secondary' : 'bg-white' }`}
                onClick={() => navigate(ROUTER_APP_PATHS.RESERVATIONREVIEW.replace(":id", it.reservationId.toString()))}
                key={it.reservationId}
              >
                <p className="font-bold w-1/2">{it.responsibleName}</p>
                <p className="w-1/3">{
                  t(reservationsOptions.find(reservationOption => reservationOption.id === it.reservationType)?.name ?? "not_defined")
                }</p>
                <p className="w-1/6">{dayjs(it.arriveTime).format("d/m/YYYY")}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full bg-primary flex flex-col">
      <div className="w-full flex lg:flex-row flex-col pb-8 pt-2 px-8 justify-between items-center">
        <h1 className="font-extrabold text-white text-3xl pt-6">{t("reservations")}</h1>
        <Dropdown
          id="reservationState"
          data={reservationStates}
          label={t("reservation_state")}
          labelColor='text-white'
          onSelect={option => filter(option)}
        />
      </div>
      {reservations()}
    </div>
  )
}
