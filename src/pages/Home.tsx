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
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  

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
      <div className="flex flex-wrap items-center gap-4 px-6 py-6">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1 1 18 10.5 7.5 7.5 0 0 1 10.5 18z"></path></svg>
              <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-[#1a1a1a] text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-700 bg-[#1a1a1a] text-white text-sm cursor-pointer"
          >
            <option value="id">Default</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-700 bg-[#1a1a1a] text-white text-sm cursor-pointer"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {products.length > 0 ? (
          products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">No products found</div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  </div>
  );
}
