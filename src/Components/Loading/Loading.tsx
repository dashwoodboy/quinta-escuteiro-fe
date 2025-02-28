
import React from "react";
import {FallingLines} from "react-loader-spinner";

export function Loading({ color = "#ffffff" }: { color?: string }) {
  return (
    <>
      <FallingLines
        color={color}
        width="100"
        visible={true}
      />
    </>
  );
}
