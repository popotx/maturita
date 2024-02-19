import React, { useState, useEffect } from "react";
import './../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Cart from "../pictures/cart.png";
import logo from '../pictures/bonsai.png';

function Navbar() {
  let navigate = useNavigate();

  const handleClick = (category) => {
    localStorage.setItem('selectedCategory', category);
    navigate("/shop");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setUsername] = useState("");

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
}, []);
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <Link className="nav-link" to="/"><img src={logo} className="logo-icon" alt="logo-icon"/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="exploreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  EXPLORE
                </Link>
                <ul className="dropdown-menu" aria-labelledby="exploreDropdown">
      <li onClick={() => handleClick('Seeds')}>
        <Link className="dropdown-item" to="/shop">Seeds</Link>
      </li>
      <li onClick={() => handleClick('Plants')}>
        <Link className="dropdown-item" to="/shop">Plant</Link>
      </li>
      <li onClick={() => handleClick('Gear')}>
        <Link className="dropdown-item" to="/shop">Tools</Link>
      </li>
      <li onClick={() => handleClick('Trees')}>
        <Link className="dropdown-item" to="/shop">Trees</Link>
      </li>
    </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about_us">ABOUT US</Link>
              </li>
            </ul>
          </div>
                <Link to="/cart"><img src={Cart} className="cart" alt="cart"/></Link>
          <div className="d-flex align-items-center">
          {isLoggedIn ? (
                <>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                  <button className="nav-link" onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    window.location.reload(); // Add this line to refresh the page
                    }}>
                        Log out 
                  </button>
                  </div>
                    </>
                  ) : (
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link" to="/login">LOGIN</Link>
                    </div>
                )}
          </div>
         
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

