import React from "react";
import { IMAGES_ID } from "../Constants/ImagesIds";
import { getCdnImage } from "../Services/ImagesService";
import {AdvancedImage} from "@cloudinary/react";
import {ROUTER_APP_PATHS} from "../Constants/Routes";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export function Home() {
    const { t } = useTranslation();

    const iconQuinta = getCdnImage(IMAGES_ID.QUINTA_ICON);
    const imageQuinta = getCdnImage(IMAGES_ID.QUINTA_IMAGE);

    const navigate = useNavigate();

    return (
        <div className="flex w-full overflow-y-hidden no-scrollbar">
            <div className="w-1/2 ">
                <AdvancedImage cldImg={imageQuinta} />
            </div>
            <div className="w-1/2 bg-primary h-full flex flex-col justify-center items-center p-8">
                <AdvancedImage
                    className="w-60"
                    cldImg={iconQuinta}
                    key={iconQuinta.getSignature()}
                />
                <h1 className="font-bold text-white text-5xl font-libre mt-16">{t("title")}</h1>
                <div className="flex flex-col mt-10 w-full px-36">
                    <button
                        className="bg-white w-full py-4 rounded-lg drop-shadow-lg mb-8 text-primary font-bold hover:bg-gray-300 hover:drop-shadow-none"
                    >
                        {t("more")}
                    </button>
                    <button
                        className="bg-white w-full py-4 rounded-lg drop-shadow-lg text-primary font-bold hover:bg-gray-300 hover:drop-shadow-none"
                        onClick={() => navigate(ROUTER_APP_PATHS.RESERVATION)}
                    >
                        {t("reserve")}
                    </button>
                </div>
            </div>
        </div>
    );
}
