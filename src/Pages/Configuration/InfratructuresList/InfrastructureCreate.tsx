import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {ValidationError} from "yup";
import {useTranslation} from "react-i18next";
import {Input} from "../../../Components/Input/Input";
import {InputSizes} from "../../../Components/utils/InputSizes";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {FileInput} from "../../../Components/Input/FileInput";
import {Loading} from "../../../Components/Loading/Loading";
import {useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../../Constants/Routes";
import {InfrastructureInput} from "../../../Models/InfrastructureInput";
import {createInfrastructure} from "../../../Services/InfrastructureService";

export function InfrastructureCreate() {

  const inputValidationSchema = yup.object().shape({
    infrastructureNamePt: yup.string().required("required"),
    infrastructureNameEn: yup.string().required("required"),
    aboutInfrastructurePt: yup.string().required("required"),
    aboutInfrastructureEn: yup.string().required("required"),
    icon: yup.string()
  })

  const [inputValues, setInputValues] = useState<InfrastructureInput>({
    infrastructureNamePt: "",
    infrastructureNameEn: "",
    aboutInfrastructurePt: "",
    aboutInfrastructureEn: "",
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
  }, [inputValues, errors]);

  const validateAndAddInfrastructure = async () => {
    setErrors({})
    try {

      await inputValidationSchema.validate(inputValues, {abortEarly: false})

      setCreating(true)

      await createInfrastructure(inputValues)

      navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)

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
                    setInputValues(prev => ({...prev, file: (inputValue !== null && inputValue.length > 0)? inputValue[0] : null}))
                  }}
                />

              </div>
            </div>
            {errors.general && <label className="font-robot text-red-500 font-medium px-4">{t(errors.general)}</label>}
            <div className="flex px-4 gap-x-8 mt-10 pb-8">
              <button
                className="bg-gray-300 w-1/2 py-2 hover:bg-red-400 rounded-lg drop-shadow-lg text-primary font-bold hover:text-white"
                onClick={() => navigate(ROUTER_APP_PATHS.INFRASTRUCTURESLIST)}
              >
                {t("cancel")}
              </button>
              <button
                className="bg-primary w-1/2 py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300"
                onClick={validateAndAddInfrastructure}
              >
                {t("create_infrastructure")}
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
        <ImageCdn imageName={"host/infrastructure_create.jpg"} className="h-full w-full"/>
      </div>
    </div>
  );
}
