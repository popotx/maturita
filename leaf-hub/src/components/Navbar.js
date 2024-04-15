import React, { useState, useEffect } from "react";
import "./../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartEmpty from "../pictures/cart.png"; 
import CartFull from "../pictures/niga.png"; 
import logo from "../pictures/bonsai.png";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();

  const handleClick = (category) => {
    localStorage.setItem("selectedCategory", category);
    navigate("/shop");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setUsername] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          const usernameResponse = await fetch("http://localhost:5000/getUsername", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const usernameData = await usernameResponse.json();
          setUsername(usernameData.username);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:5000/cartItemCount", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setCartItemCount(data.cartItemCount);
        }
      } catch (error) {
        console.error("Error fetching cart items count: ", error);
      }
    };

    fetchCartItemCount();
  }, []);

  
  const isCartPage = () => {
    return location.pathname === "/cart";
  };

  return (
    <div className={`App ${scrolled ? "scrolled" : ""}`}>
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${scrolled ? "red-bg" : ""}`}>
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img src={logo} className="logo-icon" alt="logo-icon" />
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="exploreDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  EXPLORE
                </Link>
                <ul className="dropdown-menu" aria-labelledby="exploreDropdown">
                  <li onClick={() => handleClick("Seeds")}>
                    <Link className="dropdown-item" to="/shop">
                      Seeds
                    </Link>
                  </li>
                  <li onClick={() => handleClick("Plants")}>
                    <Link className="dropdown-item" to="/shop">
                      Plants
                    </Link>
                  </li>
                  <li onClick={() => handleClick("Gear")}>
                    <Link className="dropdown-item" to="/shop">
                      Tools
                    </Link>
                  </li>
                  <li onClick={() => handleClick("Trees")}>
                    <Link className="dropdown-item" to="/shop">
                      Trees
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about_us">
                  ABOUT US
                </Link>
              </li>
            </ul>
          </div>
          {!isCartPage() && (
            <Link to="/cart">
              <img
                src={cartItemCount > 0 ? CartFull : CartEmpty}
                className={cartItemCount === 0 ? "cart" : ""}
                alt="cart"
              />
            </Link>
          )}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                  <button
                    className="nav-link"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      window.location.reload(); 
                    }}
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
