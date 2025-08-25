import React from "react";
import cross from "./../../../assets/cross.png";
import bread from "./../../../assets/bread.png";
import transportation from "./../../../assets/transportation.png";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {useTranslation} from "react-i18next";

export function UsefulInformationTab() {

	const { t } = useTranslation();

	return (
		<div className="w-full h-full flex">
			<div className="w-full md:w-1/2 md:m-8 m-2 mb-12 ">
				<div className="w-full h-1/3 flex justify-between pt-8 items-center  rounded-tr-2xl">
					<div className="md:pl-8 pb-8 pr-8">
						<p className="font-bold text-2xl text-white">{t("mass")}</p>
						<p className="text-white">{t("mass_info")} <a className="whitespace-nowrap font-bold hover:text-secondary" href="https://www.leiria-fatima.pt/calendar/missas-batalha/">Diocese Leiria-Fátima</a></p>
					</div>
					<div>
						<img className="rounded-2xl md:h-40" src={cross} alt="church"/>
					</div>
				</div>
				<div className="w-full h-1/3 flex items-center ">
					<div className="md:pl-8">
						<img className="rounded-2xl md:h-40 md:w-full w-24" src={bread} alt="church"/>
					</div>
					<div className="pl-8 pb-8">
						<p className="font-bold text-2xl text-white">{t('baker')}</p>
						<p className="text-white">{t('baker_info')}</p>
						<p className="text-white">(+351)966 928 468 (Bruno Coelho)</p>
					</div>
				</div>
				<div className="w-full h-1/3 flex justify-between items-center">
					<div className="md:pl-8 pb-8 pr-8 w-3/4">
						<p className="font-bold text-2xl text-white">{t('public_transport')}</p>
						<p className="text-white">{t('public_transport_info')} <a className="whitespace-nowrap font-bold hover:text-secondary" href="http://www.girabatalha.pt/">GIRA Batalha</a></p>
					</div>
					<div>
						<img className="rounded-2xl md:h-40 md:w-full w-24" src={transportation} alt="church"/>
					</div>
				</div>
			</div>
			<div className="hidden w-1/2 h-full max-h-full md:flex items-center justify-center">
				<ImageCdn imageName={"torre.jpg"} className="h-full w-full  text-white"/>
			</div>
		</div>
	)
}