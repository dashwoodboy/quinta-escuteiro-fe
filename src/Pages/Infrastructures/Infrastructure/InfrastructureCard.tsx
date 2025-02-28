import React from "react";
import {useTranslation} from "react-i18next";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {Infrastructure} from "../../../Models/Infrastructure";
import {getInfrastructureImageId} from "../../../Services/InfrastructureService";

interface InfrastructureCardProps {
  infrastructure: Infrastructure
}

export function InfrastructureCard(infrastructureProps: InfrastructureCardProps) {

  const { i18n, t } = useTranslation();
  const {
    infrastructureId,
    infrastructureNamePt,
    infrastructureNameEn,
    aboutInfrastructureEn,
    aboutInfrastructurePt,
    icon
  } = infrastructureProps.infrastructure

  return (
    <div key={infrastructureId} className="w-full bg-white rounded-lg drop-shadow-2xl bg-opacity-65 flex">
      <div className="bg-white w-2/5 h-80 rounded-lg shadow-[rgba(0,0,0.1,0.1)_4px_0px_2px_0px] flex flex-col items-center">
        <ImageCdn imageName={getInfrastructureImageId(icon)} className="w-full h-3/4 rounded-t-lg"/>
        <h1 className="w-full text-primary font-bold h-1/4 flex items-center justify-center text-center text-xl px-2">
          {i18n.language === 'pt'? infrastructureNamePt : infrastructureNameEn}
        </h1>
      </div>
      <div className="w-3/5 px-6 py-4 max-h-64">
        <h2 className="text-primary font-bold text-xl">
          {t("about_infrastructure")}
        </h2>
        <p className="w-full h-full overflow-y-auto scrollbar pt-2">
          {i18n.language === 'pt'? aboutInfrastructureEn : aboutInfrastructurePt}
        </p>
      </div>
    </div>
  );
}
