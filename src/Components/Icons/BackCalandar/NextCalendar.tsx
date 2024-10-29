import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForward} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "../../../Models/Colors";

interface NextCalendarProps {
  color: Colors,
  onClick: () => void;
}

export function NextCalendar({ color, onClick }: NextCalendarProps) {
    return (
        <>
            <FontAwesomeIcon
                icon={faForward}
                size="lg"
                onClick={onClick}
                className={`cursor-pointer ${Colors.background(color)} p-4 rounded-2xl text-white hover:opacity-70 active:bg-gray-400 active-duration-short shadow-lg active:shadow-none`}
            />
        </>
    );
}
