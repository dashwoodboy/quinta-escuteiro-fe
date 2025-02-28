import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {ReservationInput} from "../../../Models/ReservationInput";
import {createReservation} from "../../../Services/ReservationService";
import {ValidationError} from "yup";
import {getCdnImage} from "../../../Services/ImagesService";
import {IMAGES_ID} from "../../../Constants/ImagesIds";
import {useTranslation} from "react-i18next";
import {Scouts} from "../../Reservation/Options/Scouts";
import {CatholicStructures} from "../../Reservation/Options/CatholicStructures";
import {Input} from "../../../Components/Input/Input";
import {InputSizes} from "../../../Components/utils/InputSizes";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import {reservationsOptions} from "../../Reservation/Utils";
import {OnSite} from "../../Reservation/OnSite";
import {AdvancedImage} from "@cloudinary/react";
import {ActivityInput} from "../../../Models/ActivityInput";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {Switch} from "../../../Components/Input/Switch";
import {createActivity, removeActivity, updateActivity} from "../../../Services/ActivityService";
import {FileInput} from "../../../Components/Input/FileInput";
import {Loading} from "../../../Components/Loading/Loading";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {useQuery} from "@tanstack/react-query";
import {Activity} from "../../../Models/Activity";
import {ApiEndpoints} from "../../../Constants/ApiEndpoints";
import TipTap from "../../../Components/TipTap/TipTap";

export function ActivityUpdate() {

  const inputValidationSchema = yup.object().shape({
    titlePt: yup.string().required("required"),
    titleEn: yup.string().required("required"),
    smallMessagePt: yup.string().required("required"),
    smallMessageEn: yup.string().required("required"),
    messagePt: yup.string().required("required"),
    messageEn: yup.string().required("required"),
    outside: yup.boolean().required("required"),
    icon: yup.string()
  })

  const [inputValues, setInputValues] = useState<ActivityInput>({
    id: "",
    titlePt: "",
    titleEn: "",
    smallMessagePt: "",
    smallMessageEn: "",
    messagePt: "",
    messageEn: "",
    outside: false,
    icon: "",
    file: null
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()

  const { isPending, error, data } = useQuery<Activity>({
    queryKey: [`activity_${id}`],
    queryFn: async () => {
      if (id) {
        const res = await fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ACTIVITY.replace("{id}", id)}`);
        return await res.json();
      } else {
        throw  new Error("invalid_id")
      }
    }
  })

  useEffect(() => {
    if (!isPending && data) {
      setInputValues({
        id: data.activityId,
        titlePt: data.titlePt,
        titleEn: data.titleEn,
        smallMessagePt: data.smallMessagePt,
        smallMessageEn: data.smallMessageEn,
        messagePt: data.messagePt,
        messageEn: data.messageEn,
        outside: data.outside,
        icon: data.icon,
        file: null
      })

      setLoading(false)
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [inputValues]);

  const validateAndUpdateActivity = async () => {
    setErrors({})
    try {

      await inputValidationSchema.validate(inputValues, {abortEarly: false})

      setLoading(true)

      await updateActivity(inputValues)

      navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)

    } catch (e: any) {
      setLoading(false)
      if (e instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        e.inner.forEach((error) => {
          newErrors[error.path as string] = error.message;
        });
        setErrors(newErrors)
      } else {
        setErrors({general: "error_updating"})
      }
    }
  }

  const deleteActivity = async () => {
    try {
      await removeActivity(id)
      navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)
    } catch (e) {
      setErrors({general: "error_removing_activity"})
    }
  }

  const activity = () => {
    if (error) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-8">
          <p className="font-bold text-primary">{t("error_loading_activity")}</p>
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)}
          >
            {t("return")}
          </button>
        </div>
      )
    } else if (loading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loading color={"#0D6054"}/>
        </div>
      )
    } else {
      return (
        <div className="h-full max-h-full overflow-y-auto scrollbar">
        <div>
          <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-6">
            <Input
              label={t("activity_title_pt")}
              size={InputSizes.XLARGE}
              value={inputValues.titlePt}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, titlePt: value}))
              }
              error={errors?.titlePt}
            />
            <Input
              label={t("activity_title_en")}
              value={inputValues.titleEn}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, titleEn: value}))
              }
              error={errors?.titleEn}
            />
            <Input
              label={t("small_about_pt")}
              size={InputSizes.AREA}
              value={inputValues.smallMessagePt}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, smallMessagePt: value}))
              }
              error={errors?.messagePt}
            />
            <Input
              label={t("small_about_en")}
              size={InputSizes.AREA}
              value={inputValues.smallMessageEn}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, smallMessageEn: value}))
              }
              error={errors?.messageEn}
            />
            <TipTap
              label={t("about_pt")}
              size={InputSizes.AREA}
              value={inputValues.messagePt}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, messagePt: value}))
              }
              error={errors?.messagePt}
            />
            <TipTap
              label={t("about_en")}
              size={InputSizes.AREA}
              value={inputValues.messageEn}
              required={true}
              onChange={
                (value: string) => setInputValues(prev => ({...prev, messageEn: value}))
              }
              error={errors?.messageEn}
            />
            <Switch
              label={t("activity_outside")}
              value={inputValues.outside}
              onChange={
                (value: boolean) => setInputValues(prev => ({...prev, outside: value}))
              }
              error={errors?.outside}
            />
            <FileInput
              selected={(inputValues.file !== null || inputValues.icon !== "")}
              label={t("activity_image")}
              onChange={(inputValue) => {
                if (inputValue !== null) {
                  setInputValues(prev => ({...prev, file: (inputValue.length > 0) ? inputValue[0] : null}))
                } else {
                  setInputValues(prev => ({...prev, file: null, icon: ""}))
                }
              }}
            />

          </div>
        </div>
        {errors.general && <label className="font-robot text-red-500 font-medium px-4">{t(errors.general)}</label>}
        <div className="w-full flex px-4">
          <button
            className="bg-red-400 hover:bg-red-500 w-full py-2 mt-10 rounded-lg drop-shadow-lg font-bold text-white"
            onClick={deleteActivity}
          >
            {t("remove_activity")}
          </button>
        </div>
        <div className="flex px-4 gap-x-8 pb-8 mt-4">
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-gray-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)}
          >
            {t("cancel")}
          </button>
          <button
            className="bg-primary w-1/2 py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300"
            onClick={validateAndUpdateActivity}
          >
            {t("update_activity")}
          </button>
        </div>
      </div>
      )
    }
  }


  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex flex-col w-1/2 pl-4 pr-4 py-4">
        {activity()}
      </div>
      <div className="w-1/2 h-full">
        <ImageCdn imageName={"host/activity_create.jpg"} className="h-full w-full"/>
      </div>
    </div>
  );
}
