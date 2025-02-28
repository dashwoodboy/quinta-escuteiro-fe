import React from "react"
import {Steps} from "./Steps";
import {faPenToSquare, faPlane, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface StepProgressProps {
  steps: Steps,
  fistStepText: string,
  secondStepText: string,
  thirdStepText: string,
}

export function StepProgress({ steps, fistStepText, secondStepText, thirdStepText }: StepProgressProps) {

  const firstStepsRender = () => {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D6054] text-[#fff]">
        <FontAwesomeIcon
          icon={faPenToSquare}
        />
      </span>
    )
  }
  const secondStepsRender = (select: boolean, ) => {
    if (select) {
      return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D6054] text-[#fff]">
          <FontAwesomeIcon
            icon={faPlane}
          />
        </span>
      )
    } else {
      return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full dark:bg-[#E2E9F0] dark:text-[#A0B1C0]">
          <FontAwesomeIcon
            icon={faPlane}
          /></span>
      )
    }
  }

  const thirdsStepsRender = (select: boolean, ) => {
    if (select) {
      return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D6054] text-[#fff]">
          <FontAwesomeIcon
            icon={faLock}
          />
        </span>
      )
    } else {
      return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full dark:bg-[#E2E9F0] dark:text-[#A0B1C0]">
          <FontAwesomeIcon
            icon={faLock}
          /></span>
      )
    }
  }

  return (
    <ol className="mx-auto h-72 flex w-full max-w-lg items-center justify-between ">
      <li className="flex w-full items-center">
        <div className="relative flex flex-col items-center">
          {firstStepsRender()}
          <div className="absolute top-0 mt-12 w-32 text-center">{fistStepText}</div>
        </div>
        <div className={`flex-auto border-t-2 ${steps !== Steps.ONE && 'border-[#0D6054]'}`}></div>
      </li>
      <li className="flex w-full items-center">
        <div className="relative flex flex-col items-center">
          {secondStepsRender(steps !== Steps.ONE)}
          <div className="absolute top-0 mt-12 w-32 text-center">{secondStepText}</div>
        </div>
        <div className={`flex-auto border-t-2 ${steps === Steps.THREE && 'border-[#0D6054]'}`}></div>
      </li>
      <li>
        <div className="relative flex flex-col items-center">
          {thirdsStepsRender(steps === Steps.THREE)}
          <div className="absolute top-0 mt-12 w-32 text-center">{thirdStepText}</div>
        </div>
      </li>
    </ol>
  );
}
