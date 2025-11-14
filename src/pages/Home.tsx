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
      const res = await getPaginatedProducts(page, category || undefined, 10);
      setProducts(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, category]);

  return (
  <div className="bg-[#0D0D0D] min-h-screen text-white w-full">
   <div className="w-full px-6">
      <CategoryTabs active={category} onChange={(c) => { setCategory(c); setPage(1); }} />

      <h1 className="text-3xl font-bold px-6 mt-6">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
      </h1>

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
