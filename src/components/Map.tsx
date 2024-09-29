"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PointOfInterest } from "../types";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
  pois: PointOfInterest[];
  selectedPoi: PointOfInterest | null;
  onMarkerClick: (poi: PointOfInterest) => void;
}

export default function Map({ pois, selectedPoi, onMarkerClick }: MapProps) {
  return (
    <MapContainer
      center={[52.52, 13.405] as [number, number]} // Centered on Berlin
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", minHeight: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.latitude, poi.longitude] as [number, number]}
          eventHandlers={{
            click: () => onMarkerClick(poi),
          }}
        >
          <Popup>{poi.name}</Popup>
        </Marker>
      ))}
      {selectedPoi && (
        <Popup
          position={
            [selectedPoi.latitude, selectedPoi.longitude] as [number, number]
          }
          closeOnClick={false}
          autoClose={false}
        >
          {selectedPoi.name}
        </Popup>
      )}
    </MapContainer>
  );
}
