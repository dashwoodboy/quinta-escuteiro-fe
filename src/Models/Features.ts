export interface LineStringFeature extends GeoJSON.Feature<GeoJSON.LineString> {
	id: string;
	properties: {}; // Add any specific properties if your dataset has them
}

export interface LineStringFeatureCollection extends GeoJSON.FeatureCollection<GeoJSON.LineString> {
	features: LineStringFeature[];
	metadata: {
		tileStats: {
			layers: Array<{
				layer: string;
				sourceType: string;
				attributes: any[];
				attributeCount: number;
				geometry: string[];
			}>;
			layerCount: number;
		};
	};
}