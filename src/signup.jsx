import React,{useState}from 'react'
import './App.css'; 
import axios from "axios";
// import VisibilityIcon from '@mui/icons-material/Visibility';
import HttpsIcon from '@mui/icons-material/Https';


function Signup() {
  const [username,setUsername]= useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const handleSubmit =async(e)=>{
    e.preventDefault();
    // console.log(email);
    // console.log(username);
    // console.log(password);
    try{
      const response=await axios.post('http://localhost:1000/user',{
        email,
        username,
        password,
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
        <div class="container">
            <h1>Signup</h1>
            <div class="form">
              <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <label htmlFor="username">Username:</label>
              <input type="username"
               placeholder='enter your username'
               value={username} onChange={(e)=>setUsername(e.target.value)}>
              </input>
             
              <label htmlFor="password">Password:</label>
              <input type="password"
               placeholder='enter your password'
               value={password} onChange={(e)=>setPassword(e.target.value)}>
              
              </input>
             < HttpsIcon className='icon'/>

          
              
              {/* <VisibilityIcon/> */}
              <br/><br/>
              <div className="forget-pass">
                <label><input type="checkbox"/>Remember me</label>
                <br/>
                <a href="#">Forget Password</a>
              </div><br/><br/>
              <div className="Signup">
              <button type="submit">Signup</button>
              </div>
              <div className="Login">
                <h4>Already have an account :</h4>
              
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