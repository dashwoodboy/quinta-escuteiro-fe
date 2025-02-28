import React from "react";
import {InputSizes} from "../utils/InputSizes";
import {useTranslation} from "react-i18next";

interface InputProps {
    value: string,
    label: string,
    size?: InputSizes,
    type?: string,
    required?: boolean,
    error?: string,
    disabled?: boolean,
    onChange: (inputValue: string) => void
}

const sizeChosen = (size: InputSizes) => {
    switch (size) {
        case InputSizes.AREA:
        case InputSizes.FULL:
            return "w-full";
        case InputSizes.XLARGE:
            return "lg:w-96 w-full";
        case InputSizes.LARGE:
            return "lg: w-80 w-full";
        case InputSizes.DEFAULT:
            return "lg:w-60 w-full";
        case InputSizes.SMALL:
            return "lg:w-44 w-full";
    }
};

export function Input({
    value,
    label,
    size = InputSizes.DEFAULT,
    type,
    required = false,
    error,
    disabled = false,
    onChange
}: InputProps) {
    const { t } = useTranslation();

    return (
        <div className={`flex flex-col  ${sizeChosen(size)}`} >
            <label className="mb-1 font-robot text-gray-600 font-medium whitespace-nowrap">{label} {required && "*"}</label>
            {size !== InputSizes.AREA?
                <input
                    value={value}
                    className={`h-10 px-2 rounded-lg border  bg-gray-200 ${error? "border-red-500" :  "border-gray-300" }`}
                    type={type}
                    disabled={disabled}
                    onChange={e => onChange(e.target.value)}
                />
                :<textarea
                    value={value}
                    className={`h-32 px-2 rounded-lg border  bg-gray-200 ${error? "border-red-500" :  "border-gray-300" }`}
                    disabled={disabled}
                    onChange={e => onChange(e.target.value)}
                />
            }
            {error && <label className="font-robot text-red-500 font-medium ">{t(error)}</label>}
        </div>
    );
}
