import {InputSizes} from "../../../Components/utils/InputSizes";
import React from "react";
import {ReservationInput} from "../../../Models/ReservationInput";
import {Input} from "../../../Components/Input/Input";
import {SleepInfo} from "./SleepInfo";
import {useTranslation} from "react-i18next";

export function CatholicStructures(
    {inputValues, setInputValues}:
    {inputValues: ReservationInput, setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>}
) {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="font-bold text-xl text-primary ml-2 mt-6">Estruturas Católicas</h2>
            <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8 gap-x-4">
                <Input
                    label={t("group")}
                    size={InputSizes.FULL}
                    value={inputValues.groupName}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, groupName: value}))
                    }
                />
                <Input
                    label={t("national_organization")}
                    size={InputSizes.XLARGE}
                    value={inputValues.nationalOrganization}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, nationalOrganization: value}))
                    }
                />
                <Input
                    label={t("country")}
                    value={inputValues.country}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, country: value}))
                    }
                />
                <Input
                    label={t("address")}
                    size={InputSizes.FULL}
                    value={inputValues.address}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, country: value}))
                    }
                />
                <Input
                    label={t("place")}
                    value={inputValues.city}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, city: value}))
                    }
                />
                <Input
                    label={t("zipCode")}
                    size={InputSizes.SMALL}
                    value={inputValues.postalCode}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, postalCode: value}))
                    }
                />
                <Input
                    label={t("nif")}
                    size={InputSizes.SMALL}
                    value={inputValues.nif}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, nif: value}))
                    }
                />
                <Input
                    label={t("number_persons")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberPersons}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberPersons: value}))
                    }
                />
                <Input
                    label={t("number_participants")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberParticipants}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberParticipants: value}))
                    }
                />
                <Input
                    label={t("number_leaders")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberTeachers}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberTeachers: value}))
                    }
                />
                <Input
                    label={t("age_range")}
                    size={InputSizes.SMALL}
                    value={inputValues.ageInterval}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, ageInterval: value}))
                    }
                />
                <SleepInfo
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                />
            </div>
        </div>
    );
}
