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
import {createActivity} from "../../../Services/ActivityService";
import {FileInput} from "../../../Components/Input/FileInput";
import {Loading} from "../../../Components/Loading/Loading";
import {useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import TipTap from "../../../Components/TipTap/TipTap";

export function ActivityCreate() {

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
  const [creating, setCreating] = useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [inputValues]);

  const validateAndAddActivity = async () => {
    setErrors({})
    try {

      await inputValidationSchema.validate(inputValues, {abortEarly: false})

      setCreating(true)

      await createActivity(inputValues)

      navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)

    } catch (e: any) {
      setCreating(false)
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



  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex flex-col w-1/2 pl-4 pr-4 py-4">
        {!creating?
          (
            <div className="h-full max-h-full overflow-y-auto scrollbar">
            <div>
              <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8">
                <Input
                  label={t("activity_title_pt")}
                  size={InputSizes.FULL}
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
                  size={InputSizes.FULL}
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
                    setInputValues(prev => ({...prev, file: (inputValue !== null && inputValue.length > 0)? inputValue[0] : null}))
                  }}
                />

              </div>
            </div>
            {errors.general && <label className="font-robot text-red-500 font-medium px-4">{t(errors.general)}</label>}
            <div className="flex px-4 gap-x-8 mt-10 pb-8">
              <button
                className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
                onClick={() => navigate(ROUTER_APP_PATHS.ACTIVITIESLIST)}
              >
                {t("cancel")}
              </button>
              <button
                className="bg-primary w-1/2 py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300"
                onClick={validateAndAddActivity}
              >
                {t("create_activity")}
              </button>
            </div>
          </div>
          )
          : (
            <div className="w-full h-full flex justify-center items-center">
              <Loading color={"#0D6054"}/>
            </div>
          )
        }

      </div>
      <div className="w-1/2 h-full">
        <ImageCdn imageName={"host/activity_create.jpg"} className="h-full w-full"/>
      </div>
    </div>
  );
}
