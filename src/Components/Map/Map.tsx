import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { LineStringFeatureCollection} from "../../Models/Features";

interface MapTilerMapProps {
	center?: [number, number];
	zoom?: number;
}

interface MapInformation {
	route: LineStringFeatureCollection,
	routeColor: string,
	destinationMarker: maptilersdk.Marker
}

export function QEMap({route, routeColor, destinationMarker}: MapInformation) {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<maptilersdk.Map | null>(null);

	const state: MapTilerMapProps = {
		center: [-8.833456, 39.648507],
		zoom: 14,
	}

	const originMarker = () => {
		const popup = new maptilersdk.Popup({
			offset: 25,
			closeButton: false,
			closeOnClick: false,
		})
			.setText(
				'Quinta do Escuteiro'
			);

		return new maptilersdk.Marker({ color: '#0D6054' })
			.setLngLat([-8.833456, 39.648507])
			.setPopup(popup)
	}

	useEffect(() => {
		if (map.current || !mapContainer.current) return;

		maptilersdk.config.apiKey = "5N8AvDomzBfyysnvX4us";

		map.current = new maptilersdk.Map({
			container: mapContainer.current,
			style: maptilersdk.MapStyle.SATELLITE,
			center: state.center,
			zoom: state.zoom,
		});


		map.current.on('load', () => {
			if (!map.current) return;

			maptilersdk.helpers.addPolyline(map.current, {
				data: route,
				outline: true,
				lineWidth: [
					{zoom:14, value: 5}
				],
				lineColor: routeColor
			})

			originMarker().addTo(map.current).togglePopup();
			destinationMarker.addTo(map.current).togglePopup();

		})

		return () => {
			map.current?.remove();
			map.current = null;
		};
	}, [destinationMarker]);

	return <div ref={mapContainer} className="w-2/3 h-full rounded-lg"/>;
}