const categories = ["All Categories", "beauty", "smartphones", "furniture", "groceries"];

interface Props {
  active: string;
  onChange: (c: string) => void;
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-4 px-6 py-4 bg-[#111] border-b border-[#333]">
      {categories.map((c) => {
        const isActive = active === c || (active === "" && c === "All Categories");

        return (
          <button
            key={c}
            onClick={() => onChange(c === "All Categories" ? "" : c)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all
              border
              ${isActive 
                ? "border-white text-white bg-[#3a78f2]" 
                : "border-[#444] text-gray-300 hover:border-white hover:text-white"
              }
            `}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
