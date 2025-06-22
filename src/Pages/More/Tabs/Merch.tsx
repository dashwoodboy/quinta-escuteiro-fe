import React from "react";
import cross from "./../../../assets/cross.png";
import bread from "./../../../assets/bread.png";
import transportation from "./../../../assets/transportation.png";
import {ImageCdn} from "../../../Components/ImageCdn/ImageCdn";
import {useTranslation} from "react-i18next";

export function Team() {
	const { t } = useTranslation();

	return (
		<div className="w-full h-full flex justify-center items-center">
			<p>{t("building")}</p>
		</div>
	)
}