import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function UserIcon() {
  return (
    <>
      <FontAwesomeIcon
        icon={faUser}
        
        className="cursor-pointer text-white hover:text-secondary "
      />
    </>
  );
}
