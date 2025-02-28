import React from "react";
import {sleepType} from "../Utils";
import {Input} from "../../../Components/Input/Input";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import {ReservationInput} from "../../../Models/ReservationInput";
import {InputSizes} from "../../../Components/utils/InputSizes";
import {useTranslation} from "react-i18next";

interface SleepInfoProps {
  inputValues: ReservationInput,
  setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>,
  errors?: { [key: string]: string },
  disabled?: boolean
}

export function SleepInfo(
    {inputValues, setInputValues, errors, disabled = false}: SleepInfoProps
) {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-y-8 gap-x-4">
            <Dropdown
                id='idSleepType'
                label={t("overnight")}
                size={InputSizes.FULL}
                data={sleepType}
                selectedId={inputValues.sleepType}
                required={true}
                disabled={disabled}
                onSelect={(id) => {
                    setInputValues(prev => ({...prev, sleepType: id}));
                }}
                error={errors?.sleepType}
            />

            <Input
                label={t("arrival_date")}
                size={InputSizes.DEFAULT}
                type="datetime-local"
                value={inputValues.arriveTime}
                required={true}
                disabled={disabled}
                onChange={
                    (value: string) => setInputValues(prev => ({...prev, arriveTime: value}))
                }
                error={errors?.arriveTime}
            />
            <Input
                label={t("departure_date")}
                size={InputSizes.DEFAULT}
                type="datetime-local"
                value={inputValues.departureTime}
                required={true}
                disabled={disabled}
                onChange={
                    (value: string) => setInputValues(prev => ({...prev, departureTime: value}))
                }
                error={errors?.departureTime}
            />
        </div>
    );
}
