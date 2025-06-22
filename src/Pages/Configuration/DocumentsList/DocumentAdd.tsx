import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {boolean, ValidationError} from "yup";
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
import {DocumentInput} from "../../../Models/DocumentInput";
import {uploadDocument} from "../../../Services/DocumentService";

export function DocumentAdd() {

  const [inputValues, setInputValues] = useState<DocumentInput>({
    file: null,
    privateFile: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [inputValues]);

  const addDocument = async () => {
    setErrors({})
    try {

      if (!inputValues.file) {
        setErrors({general: "error_select_file"})
        return
      }
      setUploading(true)

      await uploadDocument(inputValues.file, inputValues.privateFile)
      setUploading(false)
      navigate(ROUTER_APP_PATHS.DOCUMENTSLIST)

    } catch (e: any) {
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
        {!uploading?
          (
            <div className="h-full max-h-full overflow-y-auto scrollbar">
            <div>
              <div className="flex flex-col flex-wrap pt-2 px-4 justify-between gap-y-8">
                <div>
                  <input
                    type="checkbox"
                    id="option1"
                    name="option1"
                    value="yes"
                    className="mr-4"
                    onClick={() => setInputValues(prev => ({...prev, privateFile: !prev.privateFile}))}
                  />
                  <label htmlFor="option1">{t('checkBox')}</label>
                </div>
                <FileInput
                  selected={inputValues.file !== null}
                  label={t("document")}
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
                onClick={addDocument}
              >
                {t("add_document")}
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
