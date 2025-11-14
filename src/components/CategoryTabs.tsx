const categories = ["All Categories", "beauty", "smartphones", "furniture","groceries"];

interface Props {
  active: string;
  onChange: (c: string) => void;
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "16px", paddingLeft: "24px", paddingRight: "24px", paddingTop: "16px", paddingBottom: "16px", backgroundColor: "#1a1a1a", color: "#fff", borderBottom: "1px solid #333" }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c === "All Categories" ? "" : c)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: active === c || (active === "" && c === "All Categories") ? "2px solid #fff" : "1px solid #555",
            backgroundColor: active === c || (active === "" && c === "All Categories") ? "transparent" : "transparent",
            color: active === c || (active === "" && c === "All Categories") ? "#fff" : "#999",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            if (active !== c && !(active === "" && c === "All Categories")) {
              (e.target as HTMLButtonElement).style.borderColor = "#fff";
              (e.target as HTMLButtonElement).style.color = "#fff";
            }
          }}
          onMouseLeave={(e) => {
            if (active !== c && !(active === "" && c === "All Categories")) {
              (e.target as HTMLButtonElement).style.borderColor = "#555";
              (e.target as HTMLButtonElement).style.color = "#999";
            }
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}