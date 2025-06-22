import React, {useState} from "react"
import {MorePageTabs} from "../../Constants/MorePageTabs";
import {QEMap} from "../../Components/Map/Map";
import market from '../../Data/MapDatasets/market.json'
import {LineStringFeatureCollection} from "../../Models/Features";
import {Places} from "../../Constants/Map/Places";
import {markers} from "../../Constants/Map/Markers/Markers";
import {PlacesTab} from "./Tabs/PlacesTab";
import {UsefulInformationTab} from "./Tabs/UsefulInformationTab";
import {Team} from "./Tabs/Team";

export function More() {

	const [activeTab, setActiveTab] = useState(MorePageTabs.PLACES)
	return (
		<div className="flex flex-col h-full w-full bg-primary">
			<div className="w-full flex h-12 min-h-12 bg-gray-300 drop-shadow-lg rounded-b-2xl">
				<button
					className={`w-1/3 font-bold rounded-bl-lg drop-shadow-lg ${activeTab === MorePageTabs.PLACES? 'bg-primary text-white' : '' }`}
					onClick={() => setActiveTab(MorePageTabs.PLACES)}
				>
					Locais Úteis
				</button>
				<button
					className={`w-1/3 font-bold drop-shadow-lg ${activeTab === MorePageTabs.USEFULINFORMATION? 'bg-primary text-white' : '' }`}
					onClick={() => setActiveTab(MorePageTabs.USEFULINFORMATION)}
				>
					Informação Útil
				</button>
				<button
					className={`w-1/3 font-bold drop-shadow-lg ${activeTab === MorePageTabs.THETEAM? 'bg-primary text-white' : '' }`}
					onClick={() => setActiveTab(MorePageTabs.THETEAM)}
				>
					A Equipa
				</button>
			</div>
			<div className="w-full h-full bg-primary drop-shadow-lg rounded-b-lg">
				{activeTab === MorePageTabs.PLACES && <PlacesTab />}
				{activeTab === MorePageTabs.USEFULINFORMATION && <UsefulInformationTab />}
				{activeTab === MorePageTabs.THETEAM && <Team />}
			</div>
		</div>
	);
}