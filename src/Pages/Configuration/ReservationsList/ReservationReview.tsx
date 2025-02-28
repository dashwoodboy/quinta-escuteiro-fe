import Dropdown from "../../../Components/Dropdown/Dropdown";
import {reservationStates} from "../../../Constants/ReservationStates";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ReservationListItem} from "../../../Models/ReservationListItem";
import {ApiEndpoints} from "../../../Constants/ApiEndpoints";
import {useParams} from "react-router-dom";
import {Loading} from "../../../Components/Loading/Loading";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {reservationsOptions, sleepType} from "../../Reservation/Utils";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {Reservation} from "../../../Models/Reservation";
import {closeReservation, confirmReservation} from "../../../Services/ReservationService";

export function ReservationReview() {

  const { id } = useParams()
  const { t } = useTranslation()

  const { isPending, error, data, refetch } = useQuery<Reservation>({
    queryKey: ['reservationReview'],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.RESERVATION.replace(":id", id ?? "")}`).then((res) =>
        res.json(),
      ),
  })

  const buttons = () => {

    const accept = async () => {
      if (id) {
        await confirmReservation(id)
        await refetch()
      }
    }

    const close = async () => {
      if (id) {
        await closeReservation(id)
        await refetch()
      }
    }

    switch (data?.state) {
      case 0:
        return (
          <button
            className="px-4 py-2 bg-primary rounded-lg text-white font-bold hover:bg-secondary shadow-xl"
            onClick={accept}
          >
            {t("accept_reservation")}
          </button>
        )
      case 1:
        return (
          <button
            className="px-4 py-2 bg-primary rounded-lg text-white font-bold hover:bg-secondary shadow-xl"
            onClick={close}
          >
            {t("close_reservation")}
          </button>
        )
      case 2:
        return (
          <div className="px-4 py-2 rounded-lg text-white font-bold bg-secondary shadow-xl">
            {t("closed_reservation")}
          </div>
        )
    }
  }

  const reservation = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#0D6054" />
        </div>
      )
    } else if (error){
      return (
        <div className="w-full h-full flex justify-center items-center">
          <p>{t("errorAdmin")}</p>
        </div>
      )
    } else {
      //TODO: add type of groups and types of association infrastructures and activities
      return (
        <div className="flex flex-col h-full overflow-y-auto p-6">
          <div className="w-full flex justify-between">
            <div className="flex">
              <h1 className="font-bold text-2xl">{t("reservation")} - </h1>
              <p className="font-bold text-2xl text-primary pl-2"> {t(reservationsOptions.find(it => it.id === data.reservationType)?.name ?? "undefined_type")}</p>
            </div>
            <div>
              {buttons()}
            </div>
          </div>
          <div className="w-full  mt-4 flex flex-col gap-y-4">
            <div>
              <p className="font-bold">{t("responsible_name")}</p>
              <p className="pl-2">{data.responsibleName}</p>
            </div>
            <div>
              <p className="font-bold">{t("responsible_email")}</p>
              <p className="pl-2">{data.responsibleName}</p>
            </div>
            <div>
              <p className="font-bold">{t("responsible_phone")}</p>
              <p className="pl-2">{data.responsiblePhone}</p>
            </div>
            <span className="w-full h-0.5 bg-gray-300"/>
            <div className="w-full h-full flex flex-wrap gap-y-4">
              {
                data.groupName
                && <div className="w-1/2">
                      <p className="font-bold">{t("group")}</p>
                      <p className="pl-2">{data.groupName}</p>
                  </div>
              }
              {
                data.nationalOrganization
                && <div className="w-1/2">
                      <p className="font-bold">{t("national_organization")}</p>
                      <p className="pl-2">{data.nationalOrganization}</p>
                  </div>
              }
              {
                data.address
                && <div className="w-1/2">
                      <p className="font-bold">{t("address")}</p>
                      <p className="pl-2">{data.address}</p>
                  </div>
              }
              {
                data.city
                && <div className="w-1/4">
                      <p className="font-bold">{t("place")}</p>
                      <p className="pl-2">{data.city}</p>
                  </div>
              }
              {
                data.postalCode
                && <div className="w-1/4">
                      <p className="font-bold">{t("zipCode")}</p>
                      <p className="pl-2">{data.postalCode}</p>
                  </div>
              }
              {
                data.groupNumber
                && <div className="w-1/2">
                      <p className="font-bold">{t("scout_group")}</p>
                      <p className="pl-2">{data.groupNumber}</p>
                  </div>
              }
              {
                data.regionName
                && <div className="w-1/4">
                      <p className="font-bold">{t("region")}</p>
                      <p className="pl-2">{data.regionName}</p>
                  </div>
              }
              {
                data.coreName
                && <div className="w-1/4">
                      <p className="font-bold">{t("core")}</p>
                      <p className="pl-2">{data.coreName}</p>
                  </div>
              }
              {
                data.groupTypeId
                && <div className="w-1/4">
                      <p className="font-bold">{t("scout_group_type")}</p>
                      <p className="pl-2">{data.groupTypeId}</p>
                  </div>
              }
              {
                data.associationTypeId
                && <div className="w-1/4">
                      <p className="font-bold">{t("association")}</p>
                      <p className="pl-2">{data.associationTypeId}</p>
                  </div>
              }
              {
                data.country
                && <div className="w-1/4">
                      <p className="font-bold">{t("country")}</p>
                      <p className="pl-2">{data.country}</p>
                  </div>
              }
              {
                data.nif
                && <div className="w-1/3">
                      <p className="font-bold">{t("nif")}</p>
                      <p className="pl-2">{data.nif}</p>
                  </div>
              }
              <div  className="flex w-full gap-x-4">
                <div>
                  <p className="font-bold">{t("number_persons")}</p>
                  <p className="pl-2">{data.numberPersons}</p>
                </div>
                {
                  data.reservationType === "1"?
                    (
                      <div>
                        <p className="font-bold">{t("number_scout_leaders")}</p>
                        <p className="pl-2">{data.numberChiefs}</p>
                      </div>
                    )
                    : (
                      <div>
                        <p className="font-bold">{t("number_leaders")}</p>
                        <p className="pl-2">{data.numberTeachers}</p>
                      </div>
                    )
                }
              </div>
              {
                data.reservationType === "1"?
                  (
                    <div className="flex w-full justify-between">
                      <div>
                        <p className="font-bold">{t("number_cub_scouts")}</p>
                        <p className="pl-2">{data.numberCubs}</p>
                      </div>
                      <div>
                        <p className="font-bold">{t("number_explorers")}</p>
                        <p className="pl-2">{data.numberExplorers}</p>
                      </div>
                      <div>
                        <p className="font-bold">{t("number_pioneers")}</p>
                        <p className="pl-2">{data.numberPioneers}</p>
                      </div>
                      <div>
                        <p className="font-bold">{t("number_rovers")}</p>
                        <p className="pl-2">{data.numberNoScouts}</p>
                      </div>
                    </div>
                  )
                  : (
                    <div>
                      <p className="font-bold">{t("number_participants")}</p>
                      <p className="pl-2">{data.numberParticipants}</p>
                    </div>
                  )
              }
            </div>
            <span className="w-full h-0.5 bg-gray-300"/>
            <div className="w-full h-full flex">
              {
                data.sleepType
                && <div className="w-1/3">
                      <p className="font-bold">{t("overnight")}</p>
                      <p className="pl-2">{t(sleepType.find(it=> it.id == data.sleepType)?.name ?? "undefined_type")}</p>
                  </div>
              }
              {
                data.arriveTime
                && <div className="w-1/3">
                      <p className="font-bold">{t("arrival_date")}</p>
                      <p className="pl-2">{dayjs(data.arriveTime).format("d/m/YYYY")}</p>
                  </div>
              }
              {
                data.departureTime
                && <div className="w-1/3">
                      <p className="font-bold">{t("departure_date")}</p>
                      <p className="pl-2">{dayjs(data.arriveTime).format("d/m/YYYY")}</p>
                  </div>
              }
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full bg-primary flex flex-col p-8">
      <div className="w-full h-full rounded-lg shadow-xl bg-white">
        {reservation()}
      </div>
    </div>
  );
}
