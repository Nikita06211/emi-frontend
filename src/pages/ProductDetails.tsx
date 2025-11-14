import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";

export default function ProductDetails() {
	const { productId } = useParams();
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
	const [mainImage, setMainImage] = useState<string>("");
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getProductById(Number(productId))
			.then((res) => {
				setProduct(res);
				setMainImage(res.imageUrl);
			})
			.catch((err) => setError(err.message || "Failed to load product"))
			.finally(() => setLoading(false));
	}, [productId]);

	useEffect(() => {
		function handleResize() {
			setIsSmallScreen(window.innerWidth < 768);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (loading) return <div style={{ color: "#fff", padding: "20px", backgroundColor: "#0D0D0D", minHeight: "100vh" }}>Loading...</div>;
	if (error) return <div style={{ color: "#ff6b6b", padding: "20px", backgroundColor: "#0D0D0D", minHeight: "100vh" }}>Error: {error}</div>;
	if (!product) return <div style={{ color: "#fff", padding: "20px", backgroundColor: "#0D0D0D", minHeight: "100vh" }}>No product found</div>;

	// safe access to emiPlans
	const emiPlans = Array.isArray(product.emiPlans) ? product.emiPlans : [];

	return (
		<div style={{ backgroundColor: "#0D0D0D", color: "#fff", minHeight: "100vh", padding: "24px" }}>
			<div style={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : "1fr 1fr", gap: isSmallScreen ? "24px" : "48px", maxWidth: "1200px", margin: "0 auto" }}>
				{/* Left: Product Image and Info */}
				<div>
					<div style={{ backgroundColor: "#1f1f1f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
						<img src={mainImage} alt={product.name} style={{ width: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px" }} />
					</div>

					{/* Thumbnails */}
					<div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
						<div
							onClick={() => setMainImage(product.imageUrl)}
							style={{
								width: "60px",
								height: "60px",
								minWidth: "60px",
								backgroundColor: "#1f1f1f",
								borderRadius: "8px",
								padding: "4px",
								cursor: "pointer",
								border: mainImage === product.imageUrl ? "2px solid #2b6cff" : "1px solid #333",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<img src={product.imageUrl} alt="thumb" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
						</div>

						{/* Additional placeholders for more thumbnails if needed */}
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								style={{
									width: "60px",
									height: "60px",
									minWidth: "60px",
									backgroundColor: "#1f1f1f",
									borderRadius: "8px",
									border: "1px solid #333",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
								}}
							>
								<span style={{ fontSize: "12px", color: "#666" }}>Img</span>
							</div>
						))}
					</div>

					{/* Product Info */}
					<div style={{ marginTop: "24px" }}>
						<h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0" }}>{product.name}</h1>
						<p style={{ color: "#9aa0a6", margin: "0 0 16px 0" }}>{product.variant}</p>
						<p style={{ textDecoration: "line-through", color: "#8a8f95", margin: "0 0 4px 0" }}>₹{product.mrp}</p>
						<p style={{ fontSize: "18px", fontWeight: "800", margin: 0 }}>₹{product.price}</p>
					</div>
				</div>

				{/* Right: EMI Plans */}
				<div>
					<h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>EMI Plans</h2>
					<div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
						{emiPlans.length > 0 ? (
							emiPlans.map((plan: any) => (
								<div
									key={plan.id}
									onClick={() => setSelectedPlanId(plan.id)}
									style={{
										border: selectedPlanId === plan.id ? "2px solid #2b6cff" : "1px solid #333",
										padding: "16px",
										borderRadius: "8px",
										cursor: "pointer",
										backgroundColor: selectedPlanId === plan.id ? "rgba(43, 108, 255, 0.1)" : "#1a1a1a",
										transition: "all 200ms ease",
									}}
								>
									<p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 6px 0" }}>Monthly: ₹{typeof plan.monthlyPayment === "number" ? plan.monthlyPayment.toFixed(0) : Number(plan.monthlyPayment).toFixed(0)}</p>
									<p style={{ color: "#9aa0a6", fontSize: "14px", margin: "0 0 4px 0" }}>Tenure: {plan.tenureMonths} months</p>
									<p style={{ color: "#9aa0a6", fontSize: "14px", margin: 0 }}>Interest: {plan.interestRate}%</p>
									{plan.cashback && <p style={{ color: "#51cf66", fontSize: "14px", margin: "6px 0 0 0" }}>{plan.cashback}</p>}
								</div>
							))
						) : (
							<p style={{ color: "#9aa0a6" }}>No EMI plans available</p>
						)}
					</div>

					<button style={{ backgroundColor: selectedPlanId ? "#2b6cff" : "#555", color: "#fff", padding: "14px 16px", borderRadius: "8px", width: "100%", border: "none", cursor: selectedPlanId ? "pointer" : "not-allowed", fontSize: "16px", fontWeight: "600", transition: "background-color 200ms ease" }}>
						{selectedPlanId ? "Proceed with EMI" : "Select a Plan to Proceed"}
					</button>
				</div>
			</div>
		</div>
	);
}
