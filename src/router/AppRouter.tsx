import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page → Categories + Products */}
        <Route path="/" element={<Home />} />

        {/* Product Details Page */}
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
