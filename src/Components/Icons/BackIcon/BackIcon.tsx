import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

interface BackIconProps {
  onClick: () => void;
}

export function BackIcon({ onClick }: BackIconProps) {
    return (
        <FontAwesomeIcon
            icon={faAngleLeft}
            size="2xl"
            onClick={onClick}
            className="cursor-pointer hover:text-primary active:text-primary active-duration-short"
        />
    );
}
