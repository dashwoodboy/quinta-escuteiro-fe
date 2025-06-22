import React, {useState} from "react";
import {Places} from "../../../Constants/Map/Places";
import {QEMap} from "../../../Components/Map/Map";
import {markers} from "../../../Constants/Map/Markers/Markers";
import {useTranslation} from "react-i18next";

export function PlacesTab(){

	const [activeMarker, setActiveMarker] = useState(Places.MARKET)
	const { t } = useTranslation();

	return (

		<div className="w-full h-full flex">
			<QEMap
				route={markers[activeMarker].route}
				routeColor="#0D6054"
				destinationMarker={markers[activeMarker].marker}
			/>
			<div className="flex flex-col p-4 w-1/3 h-full">
				<h1 className="font-bold text-white text-3xl mb-4">{t("useful_places")}</h1>
				<div className="rounded-lg bg-white bg-opacity-60 h-full w-full ">
					{
						Object.values(Places).map(place => {
							return (
								<div
									className={` px-4 py-8 first:rounded-t-lg last:rounded-b-lg font-bold cursor-pointer ${activeMarker === place? "bg-primary text-white" : "bg-gray-300"}`}
									onClick={() => setActiveMarker(place)}
								>
									<p>{t(markers[place].markerTitle)}</p>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}