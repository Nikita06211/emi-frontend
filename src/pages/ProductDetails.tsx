import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";
import type { Product, Variant, EMIPlan } from "../types/Product";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(Number(productId))
      .then((res: any) => {
        setProduct(res);
        const firstImg = Array.isArray(res.images) && res.images.length > 0 ? res.images[0] : (res.imageUrl || "");
        setMainImage(firstImg);
        if (Array.isArray(res.variants) && res.variants.length > 0) {
          setSelectedVariantId(res.variants[0].id);
        }
      })
      .catch((err) => setError(err.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white p-6">Loading...</div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-red-400 p-6">Error: {error}</div>
    );
  if (!product)
    return <div className="min-h-screen bg-[#0D0D0D] text-white p-6">No product found</div>;

  const emiPlans: EMIPlan[] = Array.isArray(product.emiPlans) ? product.emiPlans : [];
  const variants: Variant[] = Array.isArray(product.variants) ? product.variants : [];
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0] || null;

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image + Thumbs */}
        <div>
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <img src={mainImage} alt={product.name} className="w-full max-h-[480px] object-contain rounded-md" />
          </div>

          <div className="flex gap-3 overflow-x-auto mb-6">
            {Array.isArray(product.images) && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-14 h-14 min-w-[56px] rounded-md p-1 flex items-center justify-center ${mainImage === img ? "ring-2 ring-blue-500" : "border border-gray-700"} bg-gray-900`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="max-w-full max-h-full object-contain" />
                </button>
              ))
            ) : (
              <div className="w-14 h-14 min-w-[56px] rounded-md border border-gray-700 bg-gray-900 flex items-center justify-center">
                <span className="text-xs text-gray-400">No Images</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info + Variant + EMI Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-400 mb-4">{product.category}</p>

          <div className="flex items-baseline gap-4 mb-4">
            <div className="text-2xl font-extrabold">₹{displayPrice}</div>
            <div className="text-sm line-through text-gray-500">₹{product.mrp}</div>
          </div>

          {/* Variant selection pills */}
          {variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Select Variant</h3>
              <div className="flex gap-3 mb-4">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2 rounded-md text-sm border ${selectedVariantId === v.id ? "bg-blue-500 text-white border-transparent" : "bg-gray-800 text-white border-gray-700"}`}
                  >
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-gray-300">₹{v.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-lg font-bold mb-4">EMI Plans</h2>

          <div className="flex flex-col gap-4 mb-6">
            {emiPlans.length > 0 ? (
              emiPlans.map((plan) => {
                const monthly = typeof plan.monthlyPayment === "number" ? plan.monthlyPayment : Number(plan.monthlyPayment || 0);
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`text-left p-4 rounded-md border w-full ${isSelected ? "border-blue-500 bg-blue-500/10" : "border-gray-700 bg-gray-900"}`}
                  >
                    <div className="font-semibold text-base">Monthly: ₹{Math.round(monthly)}</div>
                    <div className="text-sm text-gray-400">Tenure: {plan.tenureMonths} months</div>
                    <div className="text-sm text-gray-400">Interest: {plan.interestRate}%</div>
                    {plan.cashback && <div className="text-sm text-green-400 mt-2">{plan.cashback}</div>}
                  </button>
                );
              })
            ) : (
              <div className="text-gray-400">No EMI plans available</div>
            )}
          </div>

          <button
            className={`w-full py-3 rounded-md text-white font-semibold ${selectedPlanId ? "bg-blue-600" : "bg-gray-600 cursor-not-allowed"}`}
            disabled={!selectedPlanId}
          >
            {selectedPlanId ? "Proceed with EMI" : "Select a Plan to Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
}
