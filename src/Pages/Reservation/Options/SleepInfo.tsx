import React from "react";
import {sleepType} from "../Utils";
import {Input} from "../../../Components/Input/Input";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import { ReservationInput } from "../../../Models/ReservationInput";
import { InputSizes } from "../../../Components/utils/InputSizes";
import {useTranslation} from "react-i18next";

export function SleepInfo(
    {inputValues, setInputValues}:
    {inputValues: ReservationInput, setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>}
) {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-x-8">
            <Dropdown
                id='idSleepType'
                label={t("overnight")}
                data={sleepType}
                selectedId={inputValues.sleepType}
                onSelect={(id) => {
                    setInputValues(prev => ({...prev, sleepType: id}));
                }}
            />

            <Input

                label={t("arrival_date")}
                size={InputSizes.SMALL}
                type="datetime-local"
                value={inputValues.arriveTime}
                onChange={
                    (value: string) => setInputValues(prev => ({...prev, arriveTime: value}))
                }
            />
            <Input
                label={t("departure_date")}
                size={InputSizes.SMALL}
                type="datetime-local"
                value={inputValues.departureTime}
                onChange={
                    (value: string) => setInputValues(prev => ({...prev, departureTime: value}))
                }
            />
        </div>
    );
}
