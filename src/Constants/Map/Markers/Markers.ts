import {Places} from "../Places";
import {market} from "./Market";

import * as maptilersdk from "@maptiler/sdk";
import  marketRoute from "../../../Data/MapDatasets/market.json";
import churchRoute from "../../../Data/MapDatasets/batalha_mosteiro.json"
import {LineStringFeatureCollection} from "../../../Models/Features";
import {church} from "./Church";



export const markers: Record<Places, { marker: maptilersdk.Marker, route: LineStringFeatureCollection, markerTitle: string }>= {
	[Places.MARKET]: {
		marker: market,
		route: marketRoute as LineStringFeatureCollection,
		markerTitle: "Market"
	},
	[Places.CHURCH]: {
		marker: church,
		route: churchRoute as LineStringFeatureCollection,
		markerTitle: "Church"
	}
}