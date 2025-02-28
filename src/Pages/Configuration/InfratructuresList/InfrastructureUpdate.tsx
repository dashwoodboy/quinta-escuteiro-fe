import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {ValidationError} from "yup";
import {useTranslation} from "react-i18next";
import {Input} from "../../../Components/Input/Input";
import {InputSizes} from "../../../Components/utils/InputSizes";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {FileInput} from "../../../Components/Input/FileInput";
import {Loading} from "../../../Components/Loading/Loading";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {InfrastructureInput} from "../../../Models/InfrastructureInput";
import {
  removeInfrastructure,
  updateInfrastructure
} from "../../../Services/InfrastructureService";
import {useQuery} from "@tanstack/react-query";
import {ApiEndpoints} from "../../../Constants/ApiEndpoints";
import {Infrastructure} from "../../../Models/Infrastructure";

export function InfrastructureUpdate() {

  const inputValidationSchema = yup.object().shape({
    infrastructureNamePt: yup.string().required("required"),
    infrastructureNameEn: yup.string().required("required"),
    aboutInfrastructurePt: yup.string().required("required"),
    aboutInfrastructureEn: yup.string().required("required"),
    icon: yup.string()
  })

  const [inputValues, setInputValues] = useState<InfrastructureInput>({
    infrastructureId: "",
    infrastructureNamePt: "",
    infrastructureNameEn: "",
    aboutInfrastructurePt: "",
    aboutInfrastructureEn: "",
    icon: "",
    file: null
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { t } = useTranslation();
  const { id } = useParams()

  const { isPending, error, data } = useQuery<Infrastructure>({
    queryKey: [`infrastructure_${id}`],
    queryFn: async () => {
      if (id) {
        const res = await fetch(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.INFRASTRUCTURE.replace("{id}", id)}`);
        return await res.json();
      } else {
        throw  new Error("invalid_id")
      }
    }
  })

  const deleteInfrastructure = async () => {
    try {
      await removeInfrastructure(id)
      navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)
    } catch (e) {
      setErrors({general: "error_removing_infrastructure"})
    }
  }

  useEffect(() => {
    if (!isPending && data) {
      setInputValues({
        infrastructureId: data.infrastructureId,
        infrastructureNamePt: data.infrastructureNamePt,
        infrastructureNameEn: data.infrastructureNameEn,
        aboutInfrastructurePt: data.aboutInfrastructurePt,
        aboutInfrastructureEn: data.aboutInfrastructureEn,
        icon: data.icon,
        file: null
      })

      setLoading(false)
    }
  }, [data, isPending]);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [inputValues, errors]);

  const validateAndUpdateInfrastructure = async () => {
    setErrors({})
    try {

      await inputValidationSchema.validate(inputValues, {abortEarly: false})

      setLoading(true)

      await updateInfrastructure(inputValues)

      navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)

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

  const activity = () => {
    if (error) {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-8">
          <p className="font-bold text-primary">{t("error_loading_infrastructure")}</p>
          <button
            className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
            onClick={() => navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)}
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
            <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8">
              <Input
                label={t("infrastructure_name_pt")}
                size={InputSizes.FULL}
                value={inputValues.infrastructureNamePt}
                required={true}
                onChange={
                  (value: string) => setInputValues(prev => ({...prev, infrastructureNamePt: value}))
                }
                error={errors?.infrastructureNamePt}
              />
              <Input
                label={t("infrastructure_name_en")}
                size={InputSizes.FULL}
                value={inputValues.infrastructureNameEn}
                required={true}
                onChange={
                  (value: string) => setInputValues(prev => ({...prev, infrastructureNameEn: value}))
                }
                error={errors?.infrastructureNameEn}
              />
              <Input
                label={t("about_infrastructure_pt")}
                size={InputSizes.AREA}
                value={inputValues.aboutInfrastructurePt}
                required={true}
                onChange={
                  (value: string) => setInputValues(prev => ({...prev, aboutInfrastructurePt: value}))
                }
                error={errors?.aboutInfrastructurePt}
              />
              <Input
                label={t("about_infrastructure_en")}
                size={InputSizes.AREA}
                value={inputValues.aboutInfrastructureEn}
                required={true}
                onChange={
                  (value: string) => setInputValues(prev => ({...prev, aboutInfrastructureEn: value}))
                }
                error={errors?.aboutInfrastructureEn}
              />
              <FileInput
                selected={(inputValues.file !== null || inputValues.icon !== "")}
                label={t("infrastructure_image")}
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
              onClick={deleteInfrastructure}
            >
              {t("remove_infrastructure")}
            </button>
          </div>
          <div className="flex px-4 gap-x-8 mt-10 pb-8">
            <button
              className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
              onClick={() => navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)}
            >
              {t("cancel")}
            </button>
            <button
              className="bg-primary w-1/2 py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300"
              onClick={validateAndUpdateInfrastructure}
            >
              {t("update_infrastructure")}
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
        <ImageCdn imageName={"host/infrastructure_create.jpg"} className="h-full w-full"/>
      </div>
    </div>
  );
}
