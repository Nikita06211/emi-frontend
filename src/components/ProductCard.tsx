import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const firstVariant = Array.isArray(product.variants) && product.variants.length > 0 ? product.variants[0] : null;
  const displayName = firstVariant ? firstVariant.name : product.name;
  const rawPrice = firstVariant ? firstVariant.price : product.price;
  const displayPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
  const thumb = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '';

  return (
    <Link to={`/products/${product.id}`} className="block no-underline">
      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-200 ease-in-out border border-gray-800">
        <div className="bg-[#131313] p-6 flex items-center justify-center h-44">
            <img src={thumb} alt={product.name} className="max-h-36 object-contain" />
        </div>

        <div className="p-5">
          <h3 className="text-gray-100 text-base font-semibold mb-2 leading-tight">{product.name}</h3>

          <p className="text-gray-400 text-xs m-0">{displayName || 'Brand Name'}</p>

          <div className="mt-3">
              <div className="text-white text-2xl font-extrabold">₹{Number(displayPrice).toFixed(2)}</div>
            {product.mrp && (
              <div className="text-gray-500 text-xs line-through mt-1">₹{product.mrp}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
