import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface CloseIconProps {
  onClick: () => void;
}

export function CloseIcon({ onClick }: CloseIconProps) {
    return (
        <>
            <FontAwesomeIcon
                icon={faXmark}
                size="2xl"
                onClick={onClick}
                className="cursor-pointer text-white hover:text-secondary active:text-secondary active-duration-short"
            />
        </>
    );
}
