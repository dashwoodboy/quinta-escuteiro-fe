export type MapRouteId = 'monastery' | 'supermarket';

export type MapPoint = {
  id: 'campo' | 'monastery' | 'supermarket';
  lat: number;
  lng: number;
  /** Google Maps search / directions target */
  mapsQuery: string;
};

/** Coordenadas OpenStreetMap (campo, Mosteiro da Batalha, Intermarché Batalha). */
export const mapPoints = {
  campo: {
    id: 'campo',
    lat: 39.6492903,
    lng: -8.8330197,
    mapsQuery: 'Quinta do Escuteiro Batalha',
  },
  monastery: {
    id: 'monastery',
    lat: 39.6592101,
    lng: -8.8258275,
    mapsQuery: 'Mosteiro da Batalha',
  },
  supermarket: {
    id: 'supermarket',
    lat: 39.6585994,
    lng: -8.8222266,
    mapsQuery: 'Intermarché Batalha',
  },
} as const satisfies Record<string, MapPoint>;

export const mapRoutes: { id: MapRouteId; from: MapPoint; to: MapPoint }[] = [
  { id: 'monastery', from: mapPoints.campo, to: mapPoints.monastery },
  { id: 'supermarket', from: mapPoints.campo, to: mapPoints.supermarket },
];
