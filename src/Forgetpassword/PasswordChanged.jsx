import React from "react";
import { useNavigate } from "react-router-dom";

function PasswordChanged() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Password Changed Successfully</h1>
      <p>Your password has been changed successfully. You can now log in with your new password.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}

export default PasswordChanged;
