import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface MenuIconProps {
  onClick: () => void;
}

export function MenuIcon({ onClick }: MenuIconProps) {
    return (
        <>
            <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                onClick={onClick}
                className="cursor-pointer text-white hover:text-secondary"
            />
        </>
    );
}
