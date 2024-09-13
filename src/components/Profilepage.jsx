import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';

function Profilepage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    address: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("Retrieved Token:", token); // Debug log

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:1000/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("API Response:", response.data); // Debug log
        if (response.data) {
          setUser(response.data);
          setFormData(response.data); // Initialize form data
        } else {
          setError("No user data returned from the server.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response) {
          setError(`Error: ${err.response.data}`);
        } else {
          setError("Failed to fetch profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:1000/user/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUser(formData);
      setEditMode(false);
      setError(""); // Clear any previous error messages
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response) {
        setError(`Error: ${err.response.data}`);
      } else {
        setError("Failed to update profile. Please try again later.");
      }
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {error && <p className='error'>{error}</p>}
      {user ? (
        <div className="profile-info">
          {editMode ? (
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
              <fieldset>
                <legend>Gender:</legend>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === 'Other'}
                    onChange={handleInputChange}
                  />
                  Other
                </label>
              </fieldset>
              <button className="profile-button" onClick={handleSave}>Save</button>
              <button className="profile-button" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <button className="profile-button" onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profilepage;
