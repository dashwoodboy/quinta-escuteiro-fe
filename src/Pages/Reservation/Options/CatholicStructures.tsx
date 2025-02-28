import {InputSizes} from "../../../Components/utils/InputSizes";
import React from "react";
import {ReservationInput} from "../../../Models/ReservationInput";
import {Input} from "../../../Components/Input/Input";
import {SleepInfo} from "./SleepInfo";
import {useTranslation} from "react-i18next";

interface CatholicStructuresProps {
  inputValues: ReservationInput,
  setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>,
  errors?: { [key: string]: string },
  disabled?: boolean
}

export function CatholicStructures(
    {inputValues, setInputValues, errors, disabled = false}: CatholicStructuresProps
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
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, groupName: value}))
                    }
                    error={errors?.groupName}
                />
                <Input
                    label={t("national_organization")}
                    size={InputSizes.XLARGE}
                    value={inputValues.nationalOrganization}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, nationalOrganization: value}))
                    }
                    error={errors?.nationalOrganization}
                />
                <Input
                    label={t("country")}
                    value={inputValues.country}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, country: value}))
                    }
                    error={inputValues.country}
                />
                <Input
                    label={t("address")}
                    size={InputSizes.FULL}
                    value={inputValues.address}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, country: value}))
                    }
                    error={inputValues.address}
                />
                <Input
                    label={t("place")}
                    value={inputValues.city}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, city: value}))
                    }
                    error={inputValues.city}
                />
                <Input
                    label={t("zipCode")}
                    size={InputSizes.SMALL}
                    value={inputValues.postalCode}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, postalCode: value}))
                    }
                    error={inputValues.postalCode}
                />
                {!disabled &&
                  <Input
                      label={t("nif")}
                      value={inputValues.nif}
                      disabled={disabled}
                      onChange={
                        (value: string) => setInputValues(prev => ({...prev, nif: value}))
                      }
                      error={inputValues.nif}
                  />
                }
                <Input
                    label={t("number_persons")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberPersons}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberPersons: value}))
                    }
                    error={inputValues.numberPersons}
                />
                <Input
                    label={t("number_participants")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberParticipants}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberParticipants: value}))
                    }
                    error={inputValues.numberParticipants}
                />
                <Input
                    label={t("number_leaders")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberTeachers}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberTeachers: value}))
                    }
                    error={inputValues.numberTeachers}
                />
                <Input
                    label={t("age_range")}
                    size={InputSizes.SMALL}
                    value={inputValues.ageInterval}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, ageInterval: value}))
                    }
                    error={inputValues.ageInterval}
                />
                <SleepInfo
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    errors={errors}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
