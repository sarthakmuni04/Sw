import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Sweet Shop
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </div>
      </div>
      <div className="nav-right">
        <CartIcon />
        {user ? (
          <>
            <span className="hello">Hi, {user.name}</span>
            <button
              onClick={async () => {
                await logout();
                nav("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
