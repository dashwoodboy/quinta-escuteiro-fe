import L, { type LatLngTuple } from 'leaflet';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { mapPoints, mapRoutes, type MapPoint, type MapRouteId } from '../../data/mapLocations';
import { useI18n } from '../../i18n/I18nProvider';
import { fetchWalkingRoute, type WalkingRoute } from '../../lib/fetchWalkingRoute';

const ROUTE_STYLE: Record<MapRouteId, L.PolylineOptions> = {
  monastery: { color: '#d4a574', weight: 4, opacity: 0.95 },
  supermarket: { color: '#74c69d', weight: 4, opacity: 0.95 },
};

const MARKER_STYLE = {
  campo: { color: '#f0d9b5', fillColor: '#1a4d2e', fillOpacity: 1 },
  monastery: { color: '#1a4d2e', fillColor: '#d4a574', fillOpacity: 1 },
  supermarket: { color: '#1a4d2e', fillColor: '#40916c', fillOpacity: 1 },
} as const;

type RouteMeta = { distance: string; duration: string };

function formatDistance(m: number, locale: string): string {
  if (m >= 1000) {
    return `${(m / 1000).toLocaleString(locale, { maximumFractionDigits: 1 })} km`;
  }
  return `${Math.round(m)} m`;
}

function formatDuration(s: number, locale: string): string {
  return `${Math.max(1, Math.round(s / 60)).toLocaleString(locale)} min`;
}

function straightLine(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): LatLngTuple[] {
  return [
    [from.lat, from.lng],
    [to.lat, to.lng],
  ];
}

function routeMetaFromWalking(walking: WalkingRoute, locale: string): RouteMeta {
  return {
    distance: formatDistance(walking.distanceM, locale),
    duration: formatDuration(walking.durationS, locale),
  };
}

export function ContactMap() {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<
    Partial<Record<MapRouteId, { polyline: L.Polyline; marker: L.CircleMarker }>>
  >({});
  const routesDataRef = useRef<Partial<Record<MapRouteId, { coords: LatLngTuple[]; meta: RouteMeta | null }>>>(
    {},
  );

  const [activeRoutes, setActiveRoutes] = useState<Set<MapRouteId>>(() => new Set());
  const activeRoutesRef = useRef(activeRoutes);
  activeRoutesRef.current = activeRoutes;
  const [routeMeta, setRouteMeta] = useState<Partial<Record<MapRouteId, RouteMeta>>>({});

  const fitMapView = useCallback((map: L.Map, active: Set<MapRouteId>) => {
    if (active.size === 0) {
      map.setView([mapPoints.campo.lat, mapPoints.campo.lng], 15);
      return;
    }

    const bounds = L.latLngBounds([[mapPoints.campo.lat, mapPoints.campo.lng]]);
    for (const id of active) {
      const point = mapRoutes.find((r) => r.id === id)?.to;
      if (point) bounds.extend([point.lat, point.lng]);
      const data = routesDataRef.current[id];
      if (data?.coords.length) bounds.extend(data.coords);
    }
    map.fitBounds(bounds.pad(0.12));
  }, []);

  const syncRouteVisibility = useCallback(
    (map: L.Map, active: Set<MapRouteId>) => {
      for (const route of mapRoutes) {
        const layers = routeLayersRef.current[route.id];
        if (!layers) continue;

        if (active.has(route.id)) {
          if (!map.hasLayer(layers.polyline)) layers.polyline.addTo(map);
          if (!map.hasLayer(layers.marker)) layers.marker.addTo(map);
        } else {
          if (map.hasLayer(layers.polyline)) map.removeLayer(layers.polyline);
          if (map.hasLayer(layers.marker)) map.removeLayer(layers.marker);
        }
      }
      fitMapView(map, active);
    },
    [fitMapView],
  );

  const toggleRoute = (id: MapRouteId) => {
    setActiveRoutes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (mapRef.current) syncRouteVisibility(mapRef.current, next);
      return next;
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const map = L.map(el, { scrollWheelZoom: false }).setView(
      [mapPoints.campo.lat, mapPoints.campo.lng],
      15,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const pointLabels: Record<keyof typeof mapPoints, string> = {
      campo: t('contact.mapCampo'),
      monastery: t('contact.mapMonastery'),
      supermarket: t('contact.mapSupermarket'),
    };

    const popupHtml = (point: MapPoint) =>
      `<strong>${pointLabels[point.id]}</strong><br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.mapsQuery)}" target="_blank" rel="noopener noreferrer">${t('contact.mapOpenInMaps')}</a>`;

    L.circleMarker([mapPoints.campo.lat, mapPoints.campo.lng], {
      radius: 9,
      weight: 2,
      ...MARKER_STYLE.campo,
    })
      .bindPopup(popupHtml(mapPoints.campo))
      .addTo(map);

    for (const route of mapRoutes) {
      const dest = route.to;
      const marker = L.circleMarker([dest.lat, dest.lng], {
        radius: 7,
        weight: 2,
        ...MARKER_STYLE[dest.id],
      }).bindPopup(popupHtml(dest));

      const polyline = L.polyline([], ROUTE_STYLE[route.id]);
      routeLayersRef.current[route.id] = { polyline, marker };
    }

    mapRef.current = map;
    syncRouteVisibility(map, new Set());

    let cancelled = false;

    void (async () => {
      const meta: Partial<Record<MapRouteId, RouteMeta>> = {};

      await Promise.all(
        mapRoutes.map(async (route) => {
          const walking = await fetchWalkingRoute(route.from, route.to);
          if (cancelled) return;

          const coords = walking?.coordinates ?? straightLine(route.from, route.to);
          const dashed = !walking;

          routesDataRef.current[route.id] = {
            coords,
            meta: walking ? routeMetaFromWalking(walking, locale) : null,
          };

          const layers = routeLayersRef.current[route.id];
          if (layers) {
            layers.polyline.setLatLngs(coords);
            if (dashed) layers.polyline.setStyle({ dashArray: '8 10' });
          }

          if (walking) meta[route.id] = routeMetaFromWalking(walking, locale);
        }),
      );

      if (!cancelled) {
        setRouteMeta(meta);
        if (mapRef.current) syncRouteVisibility(mapRef.current, activeRoutesRef.current);
      }
    })();

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
      routeLayersRef.current = {};
      routesDataRef.current = {};
    };
  }, [locale, syncRouteVisibility, t]);

  const routeButtons: { id: MapRouteId; label: string; swatchClass: string }[] = [
    { id: 'monastery', label: t('contact.mapRouteMonastery'), swatchClass: 'contact__map-swatch--monastery' },
    {
      id: 'supermarket',
      label: t('contact.mapRouteSupermarket'),
      swatchClass: 'contact__map-swatch--supermarket',
    },
  ];

  return (
    <div className="contact__map">
      <div ref={containerRef} className="contact__map-canvas" role="img" aria-label={t('contact.mapTitle')} />
      <div className="contact__map-controls" role="group" aria-label={t('contact.mapLegendTitle')}>
        <span className="contact__map-controls-campo">
          <span className="contact__map-swatch contact__map-swatch--campo" aria-hidden />
          {t('contact.mapCampo')}
        </span>
        {routeButtons.map(({ id, label, swatchClass }) => {
          const active = activeRoutes.has(id);
          const meta = routeMeta[id];
          return (
            <button
              key={id}
              type="button"
              className={`contact__map-route-btn${active ? ' contact__map-route-btn--active' : ''}`}
              aria-pressed={active}
              onClick={() => toggleRoute(id)}
            >
              <span className={`contact__map-swatch ${swatchClass}`} aria-hidden />
              <span className="contact__map-route-btn__text">
                {label}
                {meta && (
                  <span className="contact__map-meta">
                    {meta.distance} · ~{meta.duration}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="contact__map-attribution">{t('contact.mapAttribution')}</p>
    </div>
  );
}
