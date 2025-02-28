import {Input} from "../Input/Input";
import {InputSizes} from "../utils/InputSizes";
import Dropdown from "../Dropdown/Dropdown";
import {reservationsOptions} from "../../Pages/Reservation/Utils";
import {OnSite} from "../../Pages/Reservation/OnSite";
import React, {useEffect, useState} from "react";
import {ReservationInput} from "../../Models/ReservationInput";
import * as yup from "yup";
import {createReservation} from "../../Services/ReservationService";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";
import {ValidationError} from "yup";
import {useQuery} from "@tanstack/react-query";
import {Infrastructure} from "../../Models/Infrastructure";
import {Activity} from "../../Models/Activity";
import axios from "axios";
import {ApiEndpoints} from "../../Constants/ApiEndpoints";
import {Scouts} from "../../Pages/Reservation/Options/Scouts";
import {CatholicStructures} from "../../Pages/Reservation/Options/CatholicStructures";
import {Loading} from "../Loading/Loading";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Reservation} from "../../Models/Reservation";

interface ReservationInputsProps {
  readonly: boolean,
  initialData?: Reservation
}

export function ReservationInputs({ readonly, initialData }: ReservationInputsProps) {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const inputValidationSchema = yup.object().shape({
    responsibleName: yup.string().required("required"),
    responsiblePhone: yup.string().required("required"),
    responsibleEmail: yup.string().email("emailType").required("required"),
    typeReservationId: yup.string().required("required"),
    country: yup.string(),
    groupNumber: yup.string(),
    coreName: yup.string(),
    regionName: yup.string(),
    numberPersons: yup.number(),
    numberLobitos: yup.number(),
    numberExploradores: yup.number(),
    numberPioneiros: yup.number(),
    numberCaminheiros: yup.number(),
    numberNoScouts: yup.number(),
    numberChiefs: yup.number(),
    sleepType: yup.string().required("required"),
    arriveTime: yup.string()
      .required('required')
      .test('is-valid-date', 'required', (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Validate if it's a valid date
      }),
    departureTime: yup.string().required('required')
      .test('is-valid-date', 'required', (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Validate if it's a valid date
      }),
    groupName: yup.string(),
    nationalOrganization: yup.string(),
    address: yup.string(),
    city: yup.string(),
    postalCode: yup.string(),
    nif: yup.string(),
    numberParticipants: yup.number(),
    numberTeachers: yup.number(),
    ageInterval: yup.string()
  }).test(
    'arrive-before-departure',
    'Arrival time must be before departure time',
    function (values) {
      const { arriveTime, departureTime } = values;

      const parsedArrival = new Date(arriveTime);
      const parsedDeparture = new Date(departureTime);

      // Check if the parsed dates are valid and that arriveTime is before departureTime
      if (parsedArrival >= parsedDeparture) {
        // You can specify the field's path here for better error handling
        return this.createError({
          path: 'departureTime',  // Path to the field that caused the error
          message: 'timeOrder',
        });
      }

      return true;
    }
  )


  const [inputValues, setInputValues] = useState<ReservationInput>({
    responsibleName: initialData?.responsibleName ?? "",
    responsiblePhone: "",
    responsibleEmail: "",
    typeReservationId: initialData?.reservationType ?? "",
    country: initialData?.country ?? "",
    groupNumber: initialData?.groupNumber ?? "",
    coreName: initialData?.coreName ?? "",
    regionName: initialData?.regionName ?? "",
    numberPersons: initialData?.numberPersons ?? "0",
    numberLobitos: initialData?.numberCubs ?? "0",
    numberExploradores: initialData?.numberExplorers ?? "0",
    numberPioneiros: initialData?.numberPioneers ?? "0",
    numberCaminheiros: initialData?.numberRovers ?? "0",
    numberNoScouts: initialData?.numberNoScouts ?? "0",
    numberChiefs: initialData?.numberChiefs ?? "0",
    sleepType: initialData?.sleepType ?? "",
    arriveTime: initialData?.numberCubs ?? "",
    departureTime: initialData?.departureTime?? "",
    groupName: initialData?.groupName ?? "",
    nationalOrganization: initialData?.nationalOrganization ?? "",
    address: initialData?.address ?? "",
    city: initialData?.city ?? "",
    postalCode: initialData?.postalCode ?? "",
    nif: "",
    numberParticipants: initialData?.numberParticipants ?? "0",
    numberTeachers: initialData?.numberTeachers ?? "0",
    ageInterval: initialData?.ageInterval ?? ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [inputValues]);

  const validateAndAddReservation = async () => {
    setErrors({})
    try {
      await inputValidationSchema.validate(inputValues, {abortEarly: false})

      const data = await createReservation(inputValues)

      navigate(ROUTER_APP_PATHS.RESERVATIONSTATE)
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        e.inner.forEach((error) => {
          newErrors[error.path as string] = error.message;
        });
        setErrors(newErrors)
        console.log(newErrors)
      }
    }
  }

  const { isPending, error, data } = useQuery<{infrastructures: Infrastructure[], activities: Activity[]}>({
    queryKey: ['reservationInfo'],
    queryFn: async () => {
      const infrastructures = axios(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ALL_INFRASTRUCTURES}`)
      const activities =  axios(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ALL_ACTIVITIES}`)

      const result = await Promise.all([infrastructures, activities])

      return {
        infrastructures: result[0]?.data,
        activities: result[1]?.data
      }
    }
  })

  const renderView = () => {
    switch (inputValues.typeReservationId) {
      case "1":
        return <Scouts
          inputValues={inputValues}
          setInputValues={setInputValues}
          errors={errors}
          disabled={readonly}
        />;
      case "2":
        return <CatholicStructures
          inputValues={inputValues}
          setInputValues={setInputValues}
          errors={errors}
          disabled={readonly}
        />;
      case "3":
        return <CatholicStructures
          inputValues={inputValues}
          setInputValues={setInputValues}
          errors={errors}
          disabled={readonly}
        />;
      default:
        return <></>;
    }
  };

  const reservation = () => {
    if (isPending) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color="#0D6054"/>
        </div>
      )
    } else if (error) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-8">
          <p className="font-bold text-primary">{t("error_loading_activities_infra")}</p>
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.ROOT)}
          >
            {t("return")}
          </button>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col w-full pl-4 pr-2 py-4">
          <h1 className="font-bold text-3xl text-primary">{t("reservation")}</h1>
          <div className="h-full max-h-full overflow-y-scroll scrollbar">
            <div>
              <h2 className="font-bold text-xl text-primary ml-2 mt-4">{t("responsible")}</h2>
              <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8">
                <Input
                  label={t("responsible_name")}
                  size={InputSizes.XLARGE}
                  value={inputValues.responsibleName}
                  required={true}
                  disabled={readonly}
                  onChange={
                    (value: string) => setInputValues(prev => ({...prev, responsibleName: value}))
                  }
                  error={errors?.responsibleName}
                />
                {!readonly &&
                  <Input
                    label={t("responsible_phone")}
                    type="tel"
                    value={inputValues.responsiblePhone}
                    required={true}
                    disabled={readonly}
                    onChange={
                      (value: string) => setInputValues(prev => ({...prev, responsiblePhone: value}))
                    }
                    error={errors?.responsiblePhone}
                  />
                }
                {!readonly &&
                  <Input
                    label={t("responsible_email")}
                    size={InputSizes.FULL}
                    value={inputValues.responsibleEmail}
                    required={true}
                    disabled={readonly}
                    onChange={
                      (value: string) => setInputValues(prev => ({...prev, responsibleEmail: value}))
                    }
                    error={errors?.responsibleEmail}
                  />
                }
                <Dropdown
                  id='typeReservation'
                  label={t("reservation_type")}
                  data={reservationsOptions}
                  selectedId={inputValues.typeReservationId}
                  required={true}
                  disabled={readonly}
                  onSelect={(id) => {
                    setInputValues(prev => ({...prev, typeReservationId: id}));
                  }}
                  error={errors?.typeReservationId}
                />
              </div>
            </div>

            {renderView()}
            <OnSite
              disabled={readonly}
              inputValues={inputValues}
              setInputValues={setInputValues}
              infrastructures={
                data.infrastructures.map(it =>
                  ({
                    id: it.infrastructureId,
                    name: i18n.language === 'pt'? it.infrastructureNamePt : it.infrastructureNameEn
                  })
                )
              }
              activities={
                data.activities.filter(it => !it.outside).map(it =>
                  ({
                    id: it.activityId,
                    name: i18n.language === 'pt'? it.titlePt : it.titleEn
                  })
                )
              }
              activitiesOutside={
                data.activities.filter(it => it.outside).map(it =>
                  ({
                    id: it.activityId,
                    name: i18n.language === 'pt'? it.titlePt : it.titleEn
                  })
                )
              }
            />
            { !readonly &&
              <div className="flex px-4 gap-x-8 mt-10 pb-8">
                <button
                  className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
                  onClick={() => navigate(ROUTER_APP_PATHS.ROOT)}
                >
                  {t("cancel")}
                </button>
                <button
                  className="bg-primary w-1/2 py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300"
                  onClick={validateAndAddReservation}
                >
                  {t("reserve")}
                </button>
              </div>
            }
          </div>
        </div>
      )
    }
  }


  return reservation();
}
