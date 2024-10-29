import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface NextPersonProps {
    onClick: () => void;
}

export function NextPerson({ onClick }: NextPersonProps) {
    return (
        <div
            className="absolute right-0 bg-gray-400 px-3 py-6 rounded-tl-3xl rounded-bl-3xl opacity-40 hover:bg-lobitos hover:text-white hover:opacity-100 active:bg-lobitos active:text-white active:opacity-100 cursor-pointer z-10 active-duration-mid"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faAngleRight} size="4x" />
        </div>
    );
}
