import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar.js';
import '../styles/RegisterPage.css'; // Changed to LoginPage.css as per new instructions


function Register() { // Changed function name to Register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => { // Changed function name to handleRegister
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/register", { // Changed URL and endpoint to /register
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message); // Assuming your server responds with a message on successful registration
          alert("Registration successful!"); // Custom success alert
          navigate("/"); // Redirect to home page after successful registration
        } else {
          alert(data.message || "Registration failed"); // Custom error message based on server response
        }
      } catch (error) {
        console.error("Error registering: ", error);
        alert("An error occurred during registration");
      }
    }

    return (
        <div className="login-page"> {/* Changed class name to match the login page styling */}
            <div className="navbar">
            <Navbar />
            </div>
        <br />
        <div className="login-form"> {/* Reused the login form styling for consistency */}
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
          <button className="buttonL" type="submit">Register</button> {/* Adjusted button class for styling */}

          </div>
        </form>
        <p>Already have an account? <Link to="/login">Login here!</Link></p> {/* Updated text for registration context */}
      </div>
      </div>
    );
}

export default Register; // Exporting the modified Register component
