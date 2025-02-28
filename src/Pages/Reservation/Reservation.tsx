import React from "react";
import {ImageCdn} from "../../Components/ImageCdn/ImageCdn";
import {ReservationInputs} from "../../Components/ReservationInputs/ReservationInputs";

export function Reservation() {

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
