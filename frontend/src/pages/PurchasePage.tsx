import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PurchasePage() {
  const [cart, setCart] = useState<any[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(raw ? JSON.parse(raw) : []);
  }, []);

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const purchase = async () => {
    // For now, just clear cart and redirect to home; integrate with backend payment later
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
    nav("/");
    alert("Purchase successful (stub)");
  };

  return (
    <div className="container">
      <h2>Purchase</h2>
      <div className="card">
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div>
            {cart.map((it, idx) => (
              <div
                key={idx}
                className="row"
                style={{ justifyContent: "space-between", marginBottom: 8 }}
              >
                <div>
                  {it.name} x {it.quantity}
                </div>
                <div>${(it.price * it.quantity).toFixed(2)}</div>
              </div>
            ))}
            <hr />
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button onClick={purchase}>Confirm & Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
