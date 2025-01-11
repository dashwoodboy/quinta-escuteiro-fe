import {InputSizes} from "../../../Components/utils/InputSizes";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import React from "react";
import {ReservationInput} from "../../../Models/ReservationInput";
import { Input } from "../../../Components/Input/Input";
import {associationType, scoutsGroupType, sleepType } from "../Utils";
import {SleepInfo} from "./SleepInfo";
import {useTranslation} from "react-i18next";

export function Scouts(
    {inputValues, setInputValues}:
    {inputValues: ReservationInput, setInputValues:  React.Dispatch<React.SetStateAction<ReservationInput>>}
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
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, groupNumber: value}))
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
                    label={t("region")}
                    size={InputSizes.LARGE}
                    value={inputValues.regionName}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, regionName: value}))
                    }
                />
                <Input
                    label={t("core")}
                    size={InputSizes.LARGE}
                    value={inputValues.coreName}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, coreName: value}))
                    }
                />
                <Dropdown
                    id='tipoAgrupamento'
                    label={t("scout_group_type")}
                    size={InputSizes.XLARGE}
                    data={scoutsGroupType}
                    selectedId={inputValues.groupTypeId}
                    onSelect={(id) => {
                        setInputValues(prev => ({...prev, groupTypeId: id}));
                    }}
                />
                <Dropdown
                    id='tipoAssociacao'
                    label={t("association")}
                    data={associationType}
                    selectedId={inputValues.associationTypeId}
                    onSelect={(id) => {
                        setInputValues(prev => ({...prev, associationTypeId: id}));
                    }}
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
                    label={t("number_cub_scouts")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberLobitos}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberLobitos: value}))
                    }
                />
                <Input
                    label={t("number_explorers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberExploradores}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberExploradores: value}))
                    }
                />
                <Input
                    label={t("number_pioneers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberPioneiros}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberPioneiros: value}))
                    }
                />
                <Input
                    label={t("number_rovers")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberCaminheiros}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberCaminheiros: value}))
                    }
                />
                <Input
                    label={t("number_no_scouts")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberNoScouts}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberNoScouts: value}))
                    }
                />
                <Input
                    label={t("number_scout_leaders")}
                    size={InputSizes.SMALL}
                    type="number"
                    value={inputValues.numberChiefs}
                    onChange={
                        (value: string) => setInputValues(prev => ({...prev, numberChiefs: value}))
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
