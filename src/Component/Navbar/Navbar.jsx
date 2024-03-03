import React, { useContext } from "react";
import logo from "../../images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const { myToken, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function Logout() {
    setToken(null);
    localStorage.removeItem("kay");
    navigate("/Login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src={logo} alt="Fresh Cart" />
          </Link>
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
            {myToken ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Products">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Card">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Categories">
                    Categories
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <ul className=" list-unstyled d-flex">
                  <li>
                    <i className="me-2  fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-youtube"></i>
                  </li>
                </ul>
              </li>

              {myToken ? (
                <li>
                  {" "}
                  <span onClick={Logout} role="button" className="nav-link">
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
