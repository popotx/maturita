import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar.js';
import '../styles/LoginPage.css';
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          console.log(data.message);
          navigate("/");
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Error logging in: ", error);
        alert("An error occurred during login");
      }
    }
    return (
        <div className="login-page">
            <div className="navbar">
            <Navbar />
            </div>
        <br />
        <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-div">
          <button className="buttonL" type="submit">Login</button>

          </div>
        </form>
        <p>Don't have an account yet? <Link to="/register">Register here!</Link></p>
      </div>
      </div>
    );
  }
  export default Login;

