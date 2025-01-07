import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import HttpsIcon from '@mui/icons-material/Https';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/user', {
        firstName,
        lastName,
        email,
        username,
        password,
        address,
        age,
        gender,
      });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess('Signup successful!');
        setError("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Signup</h1>
        <div className="form">
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text" id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <HttpsIcon className='icon'/>
            </div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder='Enter your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              placeholder='Enter your age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <fieldset className="gender-fieldset">
              <legend>Gender:</legend>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </fieldset>
            <div className="forget-pass">
              <label>
                <input type="checkbox"/> Remember me
              </label>
            </div>
            <div className="Signup">
              <button type="submit">Signup</button>
            </div>
            <div className="Login">
              <h4>Already have an account:</h4>
              <a href="/">Login</a>
            </div>
          </form>
          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}
        </div>
      </div>
    </div>
  )
}

export default Signup;
