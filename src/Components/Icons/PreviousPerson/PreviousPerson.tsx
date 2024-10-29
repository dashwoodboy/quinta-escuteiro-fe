import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface PreviousPersonProps {
    onClick: () => void;
}

export function PreviousPerson({ onClick }: PreviousPersonProps) {
    return (
        <div
            className="absolute left-0 bg-gray-400 px-3 py-6 rounded-tr-3xl rounded-br-3xl opacity-40 hover:bg-lobitos hover:text-white hover:opacity-100 active:bg-lobitos active:text-white active:opacity-100 cursor-pointer z-10 active-duration-mid"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faAngleLeft} size="4x" />
        </div>
    );
}
