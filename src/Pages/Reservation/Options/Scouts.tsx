import {InputSizes} from "../../../Components/utils/InputSizes";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import React from "react";
import {ReservationInput} from "../../../Models/ReservationInput";
import { Input } from "../../../Components/Input/Input";
import {associationType, scoutsGroupType, sleepType } from "../Utils";
import {SleepInfo} from "./SleepInfo";
import {useTranslation} from "react-i18next";

interface ScoutsProps {
  inputValues: ReservationInput,
  setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>,
  errors?: { [key: string]: string },
  disabled?: boolean
}


export function Scouts(
    {inputValues, setInputValues, errors, disabled = false}: ScoutsProps
) {
    const { t } = useTranslation();

    return (
        <div>
            <h2 className="font-bold text-xl text-primary ml-2 mt-6">{t("scouts")}</h2>
            <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8 gap-x-4">
                <Input
                    label={t("scout_group")}
                    size={InputSizes.XLARGE}
                    value={inputValues.groupNumber}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, groupNumber: value}))
                    }
                    error={errors?.groupNumber}
                />
                <Input
                    label={t("region")}
                    size={InputSizes.LARGE}
                    value={inputValues.regionName}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, regionName: value}))
                    }
                    error={errors?.regionName}
                />
                <Input
                    label={t("core")}
                    size={InputSizes.LARGE}
                    value={inputValues.coreName}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, coreName: value}))
                    }
                    error={errors?.coreName}
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
                <Dropdown
                    id='tipoAgrupamento'
                    label={t("scout_group_type")}
                    size={InputSizes.XLARGE}
                    data={scoutsGroupType}
                    selectedId={inputValues.groupTypeId}
                    disabled={disabled}
                    onSelect={(id) => {
                        setInputValues(prev => ({...prev, groupTypeId: id}));
                    }}
                    error={errors?.groupTypeId}
                />
                {inputValues.groupTypeId === "3" &&
                    <Input
                    label={t("country")}
                    value={inputValues.country}
                    disabled={disabled}
                    onChange={
                      (value: string) => setInputValues(prev => ({...prev, country: value}))
                    }
                    error={errors?.country}
                    />
                }
                <Dropdown
                    id='tipoAssociacao'
                    label={t("association")}
                    data={associationType}
                    selectedId={inputValues.associationTypeId}
                    disabled={disabled}
                    onSelect={(id) => {
                        setInputValues(prev => ({...prev, associationTypeId: id}));
                    }}
                    error={errors?.associationTypeId}
                />
                <Input
                    label={t("number_persons")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberPersons}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberPersons: value}))
                    }
                    error={errors?.numberPersons}
                />
                <Input
                    label={t("number_cub_scouts")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberLobitos}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberLobitos: value}))
                    }
                    error={errors?.numberLobitos}
                />
                <Input
                    label={t("number_explorers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberExploradores}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberExploradores: value}))
                    }
                    error={errors?.numberExploradores}
                />
                <Input
                    label={t("number_pioneers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberPioneiros}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberPioneiros: value}))
                    }
                    error={errors?.numberPioneiros}
                />
                <Input
                    label={t("number_rovers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberCaminheiros}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberCaminheiros: value}))
                    }
                    error={errors?.numberCaminheiros}
                />
                <Input
                    label={t("number_no_scouts")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberNoScouts}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberNoScouts: value}))
                    }
                    error={errors?.numberNoScouts}
                />
                <Input
                    label={t("number_scout_leaders")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberChiefs}
                    disabled={disabled}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberChiefs: value}))
                    }
                    error={errors?.numberChiefs}
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
