import { useEffect, useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { getPaginatedProducts } from "../api/productApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [columns, setColumns] = useState(4);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  useEffect(() => {
    function getCols(width: number) {
      if (width < 640) return 1; // small phones
      if (width < 768) return 2; // small tablets
      if (width < 1024) return 3; // tablets / small laptops
      return 4; // desktops
    }

    function onResize() {
      setColumns(getCols(window.innerWidth));
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getPaginatedProducts(page, category || undefined, 10, search, sortBy, sortOrder);
      setProducts(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1 when sort filters change
    loadProducts();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [page, category, search]);

  return (
  <div className="bg-[#0D0D0D] min-h-screen text-white w-full">
   <div className="w-full px-6">
      <CategoryTabs active={category} onChange={(c) => { setCategory(c); }} />

      <h1 className="text-lg font-bold px-6 mx-6 mt-6">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
      </h1>

      {/* Search and Filter Bar */}
      <div style={{ display: "flex", gap: "16px", padding: "24px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            flex: "1",
            minWidth: "250px",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontSize: "14px",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="id">Sort by: Default</option>
          <option value="price">Sort by: Price</option>
          <option value="name">Sort by: Name</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <div
        className="grid"
        style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(220px, 1fr))`, gap: '32px', padding: '24px' }}
      >
        {products.length > 0 ? (
          products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 20px", color: "#999" }}>
            No products found
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  </div>
  );
}
