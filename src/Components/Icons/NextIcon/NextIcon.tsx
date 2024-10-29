import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

interface NextIconProps {
  onClick?: () => void;
  className?: string;
}

export function NextIcon({ onClick, className }: NextIconProps) {
    return (
        <FontAwesomeIcon
            icon={faAngleRight}
            size="2xl"
            onClick={onClick}
            className={`cursor-pointer hover:text-primary active:text-primary active-duration-short ${className}`}
        />
    );
}
