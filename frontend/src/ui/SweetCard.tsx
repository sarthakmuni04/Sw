import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function SweetCard({
  sweet,
  onPurchased,
}: {
  sweet: any;
  onPurchased: (s: any) => void;
}) {
  const { user } = useAuth();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const addToCart = () => {
    const raw = localStorage.getItem("cart");
    const cart = raw ? JSON.parse(raw) : [];
    const idx = cart.findIndex(
      (c: any) => (c._id || c.name) === (sweet._id || sweet.name)
    );
    if (idx >= 0) cart[idx].quantity = (cart[idx].quantity || 0) + qty;
    else cart.push({ ...sweet, quantity: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    // notify other tabs/components
    window.dispatchEvent(new Event("storage"));
  };

  const purchase = async () => {
    setLoading(true);
    const res = await fetch(`/api/sweets/${sweet._id}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quantity: qty }),
    });
    setLoading(false);
    if (res.ok) {
      const updated = await res.json();
      onPurchased(updated);
    }
  };

  const imgOnError = (e: any) => {
    e.currentTarget.src = "/fallback.png";
  };

  return (
    <div className="card">
      {sweet.imageUrl ? (
        <img
          src={sweet.imageUrl}
          onError={imgOnError}
          alt={sweet.name}
          className="thumb"
        />
      ) : (
        <img src="/fallback.png" alt="fallback" className="thumb" />
      )}
      <h3>{sweet.name}</h3>
      <p>{sweet.description}</p>
      <div className="row">
        <span className="price">${sweet.price.toFixed(2)}</span>
        <span className="qty">Qty: {sweet.quantity}</span>
      </div>
      <div className="row">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button disabled={sweet.quantity === 0} onClick={addToCart}>
          Add to Cart
        </button>
        <button
          disabled={!user || sweet.quantity === 0 || loading}
          onClick={purchase}
        >
          {sweet.quantity === 0
            ? "Out of stock"
            : loading
            ? "Purchasing…"
            : "Purchase"}
        </button>
      </div>
    </div>
  );
}
