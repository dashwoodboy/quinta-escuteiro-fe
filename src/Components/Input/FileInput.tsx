import {InputSizes} from "../utils/InputSizes";
import React from "react";
import {useTranslation} from "react-i18next";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface InputProps {
  selected: boolean,
  label: string,
  size?: InputSizes,
  accept?: string,
  required?: boolean,
  error?: string
  onChange: (inputValue: FileList | null) => void
}

const sizeChosen = (size: InputSizes) => {
  switch (size) {
    case InputSizes.AREA:
    case InputSizes.FULL:
      return "w-full";
    case InputSizes.XLARGE:
      return "w-96";
    case InputSizes.LARGE:
      return "w-80";
    case InputSizes.DEFAULT:
      return "w-60";
    case InputSizes.SMALL:
      return "w-44";
  }
};

export function FileInput({
  selected,
  label,
  size = InputSizes.DEFAULT,
  accept,
  required = false,
  error,
  onChange
}: InputProps) {

  const { t } = useTranslation();

  return (
    <div>
      <div className={`flex flex-col  ${sizeChosen(size)}`} >
        <label className="mb-1 font-robot text-gray-600 font-medium whitespace-nowrap">{label} {required && "*"}</label>
        <div className="flex w-full">
          <label htmlFor="filePicker" className={`h-10 w-full flex items-center cursor-pointer hover:bg-opacity-90 px-2 border  ${selected? 'bg-gray-200 text-gray-600 rounded-l-lg' : 'bg-primary text-white rounded-lg'}  font-bold ${error? "border-red-500" :  "border-gray-300" }`}>
            {t(selected? "change_file" : "select_File")}
          </label>
          {
            selected && <FontAwesomeIcon
              icon={faClose}
              className="cursor-pointer  p-3 bg-red-400 hover:bg-red-500 rounded-r-lg"
              onClick={() => onChange(null)}
            />
          }
          <input
            id="filePicker"
            className={`h-10 flex content-center px-2 rounded-lg border  bg-gray-200 ${error? "border-red-500" :  "border-gray-300" }`}
            type="file"
            style={{ display: "none" }}
            accept={accept}
            onChange={e => onChange(e.currentTarget.files)}
          />
        </div>
        {error && <label className="font-robot text-red-500 font-medium ">{t(error)}</label>}
      </div>
    </div>
  );
}
