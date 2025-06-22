import React from "react";
import {ImageCdn} from "../../Components/ImageCdn/ImageCdn";
import {ReservationInputs} from "../../Components/ReservationInputs/ReservationInputs";
import {Loading} from "../../Components/Loading/Loading";

export function Reservation() {

    return (
        <div className="flex h-full w-full">
          <div className="lg:w-1/2 w-full h-full flex">
            {/*<ReservationInputs readonly={false}/>*/}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeCaTbMqZeTF74mHO_sXoiVDlid17HeCuF-fKmMuxXWUGE_HA/viewform?embedded=true"
              width="100%"
              height="100%"
              title="Google Form"
              className="scrollbar"
            >
              <Loading color="#0D6054"/>
            </iframe>
          </div >
          <div className="w-1/2 lg:flex hidden h-full  bg-amber-400">
            <ImageCdn imageName={"torre.jpg"} className="h-full w-full text-white"/>
          </div>
        </div>
    );
}
