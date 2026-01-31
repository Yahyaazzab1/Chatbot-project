import type { ClientStatus } from "../types";
import { Filter } from "lucide-react";

interface Props {
  currentFilter: ClientStatus;
  onFilterChange: (filter: ClientStatus) => void;
}

export default function FilterButtons({ currentFilter, onFilterChange }: Props) {
  const filters: { value: ClientStatus; label: string; emoji: string }[] = [
    { value: "all", label: "Tous", emoji: "📋" },
    { value: "pending", label: "En attente", emoji: "⏳" },
    { value: "confirmed", label: "Confirmés", emoji: "✅" },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-700">Filtres:</span>
      </div>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            currentFilter === filter.value
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm hover:shadow-md"
          }`}
        >
          <span className="mr-2">{filter.emoji}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}

