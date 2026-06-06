import type { LatLngTuple } from 'leaflet';

export type WalkingRoute = {
  coordinates: LatLngTuple[];
  distanceM: number;
  durationS: number;
};

type OsrmGeometry = {
  coordinates: [number, number][];
};

type OsrmResponse = {
  code: string;
  routes?: { distance: number; duration: number; geometry: OsrmGeometry }[];
};

export async function fetchWalkingRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): Promise<WalkingRoute | null> {
  const coords = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const url = `https://router.project-osrm.org/route/v1/foot/${coords}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = (await res.json()) as OsrmResponse;
    const route = data.routes?.[0];
    if (data.code !== 'Ok' || !route?.geometry?.coordinates?.length) return null;

    return {
      coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      distanceM: route.distance,
      durationS: route.duration,
    };
  } catch {
    return null;
  }
}
