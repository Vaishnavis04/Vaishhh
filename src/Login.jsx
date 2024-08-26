import React, { useState } from "react";
import "./App.css";
import axios from "axios";
// import VisibilityIcon from '@mui/icons-material/Visibility';
import HttpsIcon from "@mui/icons-material/Https";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(username);
    // console.log(password);
    try{
      const response=await axios.post('http://localhost:1000/user/login',{
        username,
        password,
      });
      if(response.data.error){
        setError(response.data.error);
      }else{
        setSuccess('Signin Successful!');
        setError(" ");
      }
    }
    catch(error){
      console.error("Signin error:",error);
      setError("An error occured. Please try again");
    }
  };
  return (
    <div>
      <div class="container">
        <h1>Login</h1>
        <div class="form">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="username"
              placeholder="enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input><br/>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <HttpsIcon className="icon" />

            {/* <VisibilityIcon/> */}
            <br />
            <br />
            <div className="forget-pass">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <br />
              <a href="#">Forget Password</a>
            </div>
            <br />
            <br />
            <div className="Login">
              <button type="submit">Login</button>
            </div>
            <div className="signup">
              <h4>Don't have an account :</h4>

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
