import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    try {
      const response = await axios.post('http://localhost:1000/user/login', {
        username,
        password,
      });
      if (response.data.error) {
        setError(response.data.error);
        setSuccess("");
      } else {
        const { token } = response.data; // Assuming token is returned here
        localStorage.setItem('token', token); // Store the token
        setSuccess('Signin Successful!');
        setError("");
        navigate("/bookspage");
      }
    } catch (error) {
      console.error("Signin error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setError("An error occurred.");
      }
      setSuccess("");
    }
  };

  // Navigate to Forgot Password page
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <div className="form">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
                setSuccess("");
              }}
            /><br />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setSuccess("");
              }}
            />
            <HttpsIcon className="icon" />
            <br />
            <br />
            <div className="forget-pass">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <br />
              <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>
            <br />
            <br />
            <div className="Login">
              <button type="submit">Login</button>
            </div>
            <div className="signup">
              <h4>Don't have an account:</h4>
              <a href="Signup">Signup</a>
            </div>
          </form>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}

export default Login;

