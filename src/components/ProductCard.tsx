import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: '#111111',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
        }}
      >
        <div
          style={{
            backgroundColor: '#1f1f1f',
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 176,
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxHeight: 144, objectFit: 'contain' }}
          />
        </div>

        <div style={{ padding: 20 }}>
          <h3 style={{ color: '#2b6cff', fontSize: 17, fontWeight: 600, margin: '0 0 8px 0', lineHeight: '1.1' }}>{product.name}</h3>

          <p style={{ color: '#9aa0a6', fontSize: 12, margin: 0 }}>{product.variant || 'Brand Name'}</p>

          <div style={{ marginTop: 14 }}>
            <div style={{ color: '#ffffff', fontSize: 20, fontWeight: 800 }}>₹{product.price}</div>
            {product.mrp && (
              <div style={{ color: '#8a8f95', fontSize: 12, textDecoration: 'line-through', marginTop: 6 }}>₹{product.mrp}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
