"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLngExpression, Map } from "leaflet";

interface MapComponentProps {
  center?: number[];
}

const MapComponent = ({ center }: MapComponentProps) => {
  // const mapRef = useRef<Map | null>(null);

  // useEffect(() => {
  //   if (mapRef.current && center) {
  //     const map = mapRef.current;
  //     map.flyTo(center as LatLngExpression, 4, {
  //       animate: true,
  //       duration: 1.5, // duration in seconds
  //     });
  //   }
  // }, [center]);

  return (
    <MapContainer
      center={(center as LatLngExpression) || [20, 77]}
      zoom={4}
      style={{ height: "400px", width: "100%" }}
      className="h-[35vh] rounded-lg"
      // ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={(center as LatLngExpression) || [20, 77]}
        icon={
          new Icon({
            iconUrl: markerIconPng.src,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />
    </MapContainer>
  );
};

export default MapComponent;
