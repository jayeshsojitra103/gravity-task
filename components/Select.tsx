import { PokemonType } from "@/types/pokemon";

interface SelectProps {
  types: PokemonType[];
  selectedType: string;
  onTypeChange: (value: string) => void;
}

export function Select({ types, selectedType, onTypeChange }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full cursor-pointer bg-white capitalize placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none"
      >
        <option value="all">All types</option>
        {types.map((type) => (
          <option value={type.name} key={type.name} className="text-slate-700 ">
            {type.name}
          </option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </div>
  );
}
