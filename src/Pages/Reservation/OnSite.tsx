import React from "react";
import {activities, activitiesOutside, infrastructures} from "./Utils";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {ReservationInput} from "../../Models/ReservationInput";
import {InputSizes} from "../../Components/utils/InputSizes";
import {MultiSelection} from "../../Components/MultiSelection";
import {useTranslation} from "react-i18next";

export function OnSite(
    {inputValues, setInputValues}:
    {inputValues: ReservationInput, setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>}
) {

    const { t } = useTranslation();

    return (
        <div>
            <h2 className="font-bold text-xl text-primary ml-2 mt-6">{t("on_site")}</h2>
            <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8 gap-x-4">
                <MultiSelection
                    id="infrastructureId"
                    title={t("desired_infrastructures")}
                    selected={inputValues.infrastructuresIds}
                    data={infrastructures}
                    onChange={(items) => {
                        setInputValues(prev => ({...prev, infrastructuresIds: items}));
                    }}
                />
                <MultiSelection
                    id="activityId"
                    title={t("activities_desired")}
                    data={activities}
                    selected={inputValues.activitiesIds}
                    onChange={(items) => {
                        setInputValues(prev => ({...prev, activitiesIds: items}));
                    }}
                />
                <MultiSelection
                    id="activityId"
                    title={t("activities_outside")}
                    data={activitiesOutside}
                    selected={inputValues.activitiesOutsideIds}
                    onChange={(items) => {
                        setInputValues(prev => ({...prev, activitiesOutsideIds: items}));
                    }}
                />
            </div>
        </div>
    );
}
