// components/PoiList.tsx
import { PointOfInterest } from "../types";

interface PoiListProps {
  pois: PointOfInterest[];
}

export default function PoiList({ pois }: PoiListProps) {
  return (
    <ul>
      {pois.map((poi) => (
        <li key={poi.id}>{poi.name}</li>
      ))}
    </ul>
  );
}
