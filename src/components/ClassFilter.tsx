import type { FilterOption } from "../types";

interface Props {
  activeFilter: FilterOption;
  setFilter: (filter: FilterOption) => void;
}

const tabs: FilterOption[] = ["Pole Dance", "Pole Dance Choreography", "Fitness"];

export default function ClassFilter({ activeFilter, setFilter }: Props) {
  return (
    <div className="flex justify-center gap-3 flex-wrap mb-8">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-full border transition ${
            activeFilter === tab
              ? "bg-brown-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setFilter(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}