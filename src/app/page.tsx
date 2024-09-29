"use client";

import { useState, useEffect } from "react";
import { PointOfInterest } from "@/types";
import Map from "@/components/Map";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [filteredPois, setFilteredPois] = useState<PointOfInterest[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pois")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPois(data);
          setFilteredPois(data);
        } else {
          console.error("API did not return an array:", data);
          setError("Unexpected data format received from the server.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch POIs:", error);
        setError("Failed to load points of interest. Please try again later.");
      });
  }, []);

  useEffect(() => {
    console.log("filteredPois:", filteredPois);
  }, [filteredPois]);

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFilteredPois(pois);
    } else {
      setFilteredPois(pois.filter((poi) => poi.category === category));
    }
    setSelectedPoi(null);
  };

  const handlePoiClick = (poi: PointOfInterest) => {
    setSelectedPoi(poi);
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 sm:mb-0">
          <Card className="md:col-span-2">
            <CardContent className="p-0">
              <Map
                pois={filteredPois}
                selectedPoi={selectedPoi}
                onMarkerClick={handlePoiClick}
              />
            </CardContent>
          </Card>
          <Card className="md:col-span-1 flex flex-col md:max-h-[400px]">
            <CardContent className="p-4 flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4">Filter</h2>
              <Select onValueChange={handleFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="museum">Museums</SelectItem>
                  <SelectItem value="park">Parks</SelectItem>
                  <SelectItem value="landmark">Landmarks</SelectItem>
                </SelectContent>
              </Select>
              <h2 className="text-xl font-semibold mt-6 mb-4">POI List</h2>
              <div className="overflow-y-auto flex-grow">
                <ul className="space-y-2">
                  {Array.isArray(filteredPois) &&
                    filteredPois.map((poi) => (
                      <li
                        key={poi.id}
                        className={`p-2 rounded-md cursor-pointer ${
                          selectedPoi?.id === poi.id
                            ? "bg-blue-600 text-primary-foreground"
                            : "bg-secondary"
                        }`}
                        onClick={() => handlePoiClick(poi)}
                      >
                        {poi.name}
                      </li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
