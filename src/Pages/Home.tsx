import React from "react";
import { IMAGES_ID } from "../Constants/ImagesIds";
import { getCdnImage } from "../Services/ImagesService";
import {AdvancedImage} from "@cloudinary/react";
import {ROUTER_APP_PATHS} from "../Constants/Routes";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ImageCdn} from "../Components/ImageCdn/ImageCdn";

export function Home() {
    const { t } = useTranslation();

    const iconQuinta = getCdnImage(IMAGES_ID.QUINTA_ICON);

    const navigate = useNavigate();

    return (
        <div className="flex w-full h-full lg:flex-row flex-col bg-primary">
            <ImageCdn imageName={"quinta_entrance.jpg"} className="h-full lg:w-1/2 w-full"/>
            <div className="lg:w-1/2 w-full h-full absolute lg:relative bg-primary lg:bg-opacity-100 bg-opacity-30  flex flex-col lg:justify-center items-center p-8">
                <AdvancedImage
                    className="w-60"
                    cldImg={iconQuinta}
                    key={iconQuinta.getSignature()}
                />
                <h1 className="font-bold text-white lg:text-5xl text-4xl font-libre mt-16">{t("title")}</h1>
                <div className="flex flex-col lg:mt-10 mt-28 justify-center">
                    <button
                        className="lg:bg-white bg-primary w-96 py-4 rounded-lg drop-shadow-lg mb-8 text-white lg:text-primary font-bold hover:bg-gray-300 hover:drop-shadow-none"
                        onClick={() => navigate(ROUTER_APP_PATHS.MORE)}
                    >
                        {t("more")}
                    </button>
                    <button
                        className="lg:bg-white bg-primary w-96 py-4 rounded-lg drop-shadow-lg text-white lg:text-primary font-bold hover:bg-gray-300 hover:drop-shadow-none"
                        onClick={() => navigate(ROUTER_APP_PATHS.RESERVATION)}
                    >
                        {t("reserve")}
                    </button>
                </div>
            </div>
        </div>
    );
}
