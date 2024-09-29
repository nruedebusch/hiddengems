"use client";

import { useEffect, useState } from "react";
import { PointOfInterest } from "../types";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

interface MapProps {
  pois: PointOfInterest[];
  selectedPoi: PointOfInterest | null;
  onMarkerClick: (poi: PointOfInterest) => void;
}

export default function Map({ pois, selectedPoi, onMarkerClick }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <MapComponent
      pois={pois}
      selectedPoi={selectedPoi}
      onMarkerClick={onMarkerClick}
    />
  );
}
