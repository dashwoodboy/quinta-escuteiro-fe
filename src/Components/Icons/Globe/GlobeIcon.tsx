import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";


export function GlobeIcon() {
    return (
        <>
            <FontAwesomeIcon
                icon={faGlobe}
                size="sm"
                className="cursor-pointer "
            />
        </>
    );
}
