import React from "react";
import {InputSizes} from "../utils/InputSizes";

interface InputProps {
    value: string,
    label: string,
    size?: InputSizes,
    type?: string,
    onChange: (inputValue: string) => void
}

const sizeChosen = (size: InputSizes) => {
    switch (size) {
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

export function Input({
    value,
    label,
    size = InputSizes.DEFAULT,
    type
}: InputProps) {
    return (
        <div className={`flex flex-col  ${sizeChosen(size)}`} >
            <label className="mb-1 font-robot text-gray-600 font-medium ">{label}</label>
            <input
                value={value}
                className={"h-10 px-2 rounded-lg border border-gray-300 bg-gray-200 "}
                type={type}
            />
        </div>
    );
}
