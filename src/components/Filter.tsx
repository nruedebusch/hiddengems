// components/Filter.tsx
interface FilterProps {
  onFilter: (category: string) => void;
}

export default function Filter({ onFilter }: FilterProps) {
  return (
    <select onChange={(e) => onFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="museum">Museums</option>
      <option value="park">Parks</option>
      <option value="landmark">Landmarks</option>
    </select>
  );
}
