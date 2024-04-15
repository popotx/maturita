import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar.js';
import '../styles/RegisterPage.css'; 


function Register() { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => { 
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/register", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message); 
          alert("Registration successful!"); 
          navigate("/"); 
        } else {
          alert(data.message || "Registration failed"); 
        }
      } catch (error) {
        console.error("Error registering: ", error);
        alert("An error occurred during registration");
      }
    }

    return (
        <div className="login-page"> 
            <div className="navbar">
            <Navbar />
            </div>
        <br />
        <div className="login-form"> 
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <div>
          <button className="buttonL" type="submit">Register</button> 

          </div>
        </form>
        <p>Already have an account? <Link to="/login">Login here!</Link></p> 
      </div>
      </div>
    );
}

export default Register; 
