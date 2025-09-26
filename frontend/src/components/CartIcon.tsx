import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    const cart = raw ? JSON.parse(raw) : [];
    const total = cart.reduce(
      (s: number, it: any) => s + (it.quantity || 0),
      0
    );
    setCount(total);

    const onStorage = () => {
      const raw2 = localStorage.getItem("cart");
      const cart2 = raw2 ? JSON.parse(raw2) : [];
      setCount(cart2.reduce((s: number, it: any) => s + (it.quantity || 0), 0));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Link to="/cart" className="cart-link">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44C8.89 16.37 9.5 17 10.28 17h7.44v-2H10.28l1.1-2h6.02c.75 0 1.41-.41 1.75-1.03L22 6H6.21"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="cart-badge">{count}</span>
    </Link>
  );
}
