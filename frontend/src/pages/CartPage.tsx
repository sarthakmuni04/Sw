import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(raw ? JSON.parse(raw) : []);
  }, []);

  const changeQty = (idx: number, val: number) => {
    const copy = [...cart];
    copy[idx].quantity = Math.max(1, val);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
    window.dispatchEvent(new Event("storage"));
  };

  const remove = (idx: number) => {
    const copy = [...cart];
    copy.splice(idx, 1);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
    window.dispatchEvent(new Event("storage"));
  };

  const checkout = () => {
    nav("/purchase");
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="card">Cart is empty</div>
      ) : (
        <div>
          {cart.map((it, idx) => (
            <div
              className="card row"
              key={idx}
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img
                  src={it.imageUrl}
                  alt={it.name}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <div>
                  <div>{it.name}</div>
                  <div className="muted">${it.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) => changeQty(idx, Number(e.target.value))}
                />
                <button onClick={() => remove(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "right", marginTop: 12 }}>
            <button onClick={checkout}>Proceed to Purchase</button>
          </div>
        </div>
      )}
    </div>
  );
}
