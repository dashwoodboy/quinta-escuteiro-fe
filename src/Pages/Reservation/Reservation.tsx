import React from "react";
import {AdvancedImage} from "@cloudinary/react";
import { getCdnImage } from "../../Services/ImagesService";
import { IMAGES_ID } from "../../Constants/ImagesIds";
import {useTranslation} from "react-i18next";
import {ImageCdn} from "../../Components/ImageCdn/ImageCdn";
import {ReservationInputs} from "../../Components/ReservationInputs/ReservationInputs";

export function Reservation() {



    const imageQuinta = getCdnImage(IMAGES_ID.QUINTA_REGISTER);

    const { t } = useTranslation();


    return (
        <div className="flex h-full w-full">
          <div className="lg:w-1/2 w-full h-full flex">
            <ReservationInputs readonly={false}/>
          </div >
          <div className="w-1/2 lg:flex hidden h-full ">
            <ImageCdn imageName={"torre.jpg"} className="h-full w-full text-white"/>
          </div>
        </div>
    );
}
