import React from "react";
import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, seAuth] = useAuth();

  const handleLogout = () => {
    seAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary-subtle shadow-sm">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand fs-4 text-warning border border-end-0 rounded-pill px-4 bg-info-subtle"
          >
            RS{" "}
            <span className="text-success">
              Store <GiShoppingCart className="text-success" />
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              <NavLink to="/cart" className="nav-link">
                Cart (0)
              </NavLink>
            </ul>
            <div className="d-flex justify-content-between align-items-center mx-2 my-2 my-lg-0 gap-3">
              {!auth.user ? (
                <>
                  <NavLink to="/register" className="nav-link">
                    <button className="btn btn-outline-warning text-uppercase fs-6">
                      {" "}
                      Register
                    </button>
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    <button className="btn btn-outline-danger text-uppercase fs-6">
                      {" "}
                      Login
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
