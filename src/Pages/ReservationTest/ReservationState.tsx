import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Reservation} from "../../Models/Reservation";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import {Loading} from "../../Components/Loading/Loading";
import {useTranslation} from "react-i18next";
import {StepProgress} from "../../Components/StepProgress/StepProgress";
import {Steps} from "../../Components/StepProgress/Steps";
import {Input} from "../../Components/Input/Input";
import {InputSizes} from "../../Components/utils/InputSizes";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {reservationsOptions} from "../Reservation/Utils";
import {OnSite} from "../Reservation/OnSite";
import {ReservationInput} from "../../Models/ReservationInput";
import {Scouts} from "../Reservation/Options/Scouts";
import {CatholicStructures} from "../Reservation/Options/CatholicStructures";
import {Infrastructure} from "../../Models/Infrastructure";
import {Activity} from "../../Models/Activity";
import axios from "axios";
import {ReservationInputs} from "../../Components/ReservationInputs/ReservationInputs";

export function ReservationState() {

  const { id } = useParams()
  const { t, i18n} = useTranslation()

  const { isPending, error, data } = useQuery<Reservation>({
    queryKey: ['reservationInfo'],
    queryFn:  () => fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.RESERVATION_STATE.replace(":id", id ?? "")}`).then((res) =>
      res.json(),
    )
  })


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
      return (
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full flex">
            <ReservationInputs readonly={true} initialData={data}/>
          </div >
          <div className="w-1/2 h-full flex flex-col">
            <div className="w-full h-2/5 flex justify-center items-center">
              <StepProgress
                steps={data.state}
                fistStepText={t('created')}
                secondStepText={t('accepted')}
                thirdStepText={t('closed')}
              />
            </div>
            <div className="w-full h-3/5 flex justify-center items-center">
              <p className='text-primary font-bold text-4xl px-16'>{t('verify_email')}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex w-full h-full">
      {reservation()}
    </div>
  );
}
