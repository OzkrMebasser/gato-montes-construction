"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Map, { Layer, Source, Marker, type MapRef } from "react-map-gl/maplibre";
import circle from "@turf/circle";
import bbox from "@turf/bbox";
import type { Feature, Polygon } from "geojson";
import type { StyleSpecification } from "maplibre-gl";
import { MapPin } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

// Wickenburg, AZ
const WICKENBURG_LAT = 33.9686;
const WICKENBURG_LNG = -112.7307;

// 40 millas -> kilómetros (turf usa km)
const RADIUS_MILES = 40;
const RADIUS_KM = RADIUS_MILES * 1.60934;

export default function ServiceAreaMap() {
  const mapRef = useRef<MapRef>(null);

  const circleData: Feature<Polygon> = useMemo(() => {
    return circle([WICKENBURG_LNG, WICKENBURG_LAT], RADIUS_KM, {
      units: "kilometers",
      steps: 64,
    });
  }, []);

  // Ajusta el zoom para que el círculo completo quepa en el contenedor,
  // sin importar si es desktop, tablet o mobile.
  const fitToCircle = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const [minLng, minLat, maxLng, maxLat] = bbox(circleData);
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 24, duration: 0 }
    );
  }, [circleData]);

  // Re-ajusta si cambia el tamaño del contenedor (resize de ventana, rotación, etc.)
  useEffect(() => {
    const handleResize = () => {
      mapRef.current?.getMap()?.resize();
      fitToCircle();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fitToCircle]);

  const mapStyle: StyleSpecification = {
    version: 8,
    sources: {
      "osm-raster-tiles": {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    },
    layers: [
      {
        id: "osm-layer",
        type: "raster",
        source: "osm-raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: WICKENBURG_LNG,
        latitude: WICKENBURG_LAT,
        zoom: 6.8,
      }}
      mapStyle={mapStyle}
      style={{ width: "100%", height: "100%" }}
      onLoad={fitToCircle}
    >
      <Source type="geojson" data={circleData}>
        <Layer
          id="circle-fill"
          type="fill"
          paint={{
            "fill-color": "#A0522D",
            "fill-opacity": 0.15,
          }}
        />
        <Layer
          id="circle-border"
          type="line"
          paint={{
            "line-color": "#A0522D",
            "line-opacity": 0.8,
            "line-width": 2,
          }}
        />
      </Source>

      <Marker longitude={WICKENBURG_LNG} latitude={WICKENBURG_LAT} anchor="bottom">
        <div className="flex flex-col items-center">
          <MapPin className="w-8 h-8 text-[#A0522D] fill-[#A0522D]/20 drop-shadow-md" />
        </div>
      </Marker>
    </Map>
  );
}