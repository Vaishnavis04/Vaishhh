import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // Assuming the old password is stored or fetched.
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve the token or other parameters from the URL if necessary

  useEffect(() => {
    // You could fetch the old password or get any necessary parameters via the URL or API.
    // Example: If the token was passed in the URL for validation:
    const params = new URLSearchParams(location.search);
    // Assuming we have a token parameter in the URL to verify/reset the password
    const token = params.get("token");
    if (token) {
      // Call the API to validate the token, or proceed with password reset process.
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    if (newPassword === oldPassword) {
      setError("Old password cannot be the new password");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1000/user/change-password", { newPassword, token: location.search });
      if (response.data.success) {
        setSuccess("Password changed successfully!");
        setError("");
        navigate("/password-changed");
      }
    } catch (error) {
      setError("Failed to change password. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <label>Confirm New Password:</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default ChangePassword;
