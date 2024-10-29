import React, {useState} from "react";
import {AdvancedImage} from "@cloudinary/react";
import { getCdnImage } from "../../Services/ImagesService";
import { IMAGES_ID } from "../../Constants/ImagesIds";
import { Input } from "../../Components/Input/Input";
import { InputSizes } from "../../Components/utils/InputSizes";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {ReservationInput} from "../../Models/ReservationInput";
import { reservationsOptions } from "./Utils";
import {Scouts} from "./Options/Scouts";
import {OnSite} from "./OnSite";
import {CatholicStructures} from "./Options/CatholicStructures";
import {useTranslation} from "react-i18next";

export function Reservation() {

    const [inputValues, setInputValues] = useState<ReservationInput>({
        responsibleName: "",
        responsiblePhone: "",
        responsibleEmail: "",
        country: "",
        groupNumber: "",
        coreNumber: "",
        regionNumber: "",
        numberPersons: "",
        numberLobitos: "",
        numberExploradores: "",
        numberPioneiros: "",
        numberCaminheiros: "",
        numberNoScouts: "",
        numberDirigentes: "",
        sleepType: "",
        arriveTime: "",
        departureTime: "",
        groupName: "",
        nationalOrganization: "",
        address: "",
        city: "",
        postalCode: "",
        nif: "",
        numberParticipants: "",
        numberTeachers: "",
        ageInterval: ""
    });

    const imageQuinta = getCdnImage(IMAGES_ID.QUINTA_REGISTER);

    const { t } = useTranslation();

    const renderView = () => {
        switch (inputValues.typeReservationId) {
            case "1":
                return <Scouts
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                />;
            case "2":
                return <CatholicStructures
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                />;
            case "3":
                return <CatholicStructures
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                />;
            default:
                return <></>;
        }
    };

    return (
        <div className="flex h-full">
            <div className="flex flex-col w-1/2 pl-4 py-4">
                <h1 className="font-bold text-3xl text-primary">{t("reservation")}</h1>
                <div className="h-full max-h-full overflow-y-scroll">
                    <div>
                        <h2 className="font-bold text-xl text-primary ml-2 mt-4">{t("responsible")}</h2>
                        <div className="flex flex-wrap pt-2 px-4 justify-between gap-y-8">
                            <Input
                                label={t("responsible_name")}
                                size={InputSizes.XLARGE}
                                value={inputValues.responsibleName}
                                onChange={
                                    (value: string) => setInputValues(prev => ({...prev, responsibleName: value}))
                                }
                            />
                            <Input
                                label={t("responsible_phone")}
                                type="tel"
                                value={inputValues.responsiblePhone}
                                onChange={
                                    (value: string) => setInputValues(prev => ({...prev, responsiblePhone: value}))
                                }
                            />
                            <Input
                                label={t("responsible_email")}
                                size={InputSizes.FULL}
                                value={inputValues.responsibleEmail}
                                onChange={
                                    (value: string) => setInputValues(prev => ({...prev, responsibleEmail: value}))
                                }
                            />
                            <Dropdown
                                id='typeReservation'
                                label={t("reservation_type")}
                                data={reservationsOptions}
                                selectedId={inputValues.typeReservationId}
                                onSelect={(id) => {
                                    setInputValues(prev => ({...prev, typeReservationId: id}));
                                }}
                            />
                        </div>
                    </div>

                    {renderView()}
                    <OnSite inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
            </div>
            <div className="w-1/2">
                <AdvancedImage cldImg={imageQuinta} />
            </div>
        </div>
    );
}
