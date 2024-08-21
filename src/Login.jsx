import React from 'react'
import './App.css'; 

function Login() {
  return (
    <div>
        <div class="container">
            <h1>Login page</h1>
            <div class="form">
              <label htmlFor="username">Username:  </label>
              <input type="username"
               placeholder='enter your username'>
              </input><br/><br/>
              <label htmlFor="password">Password: </label>
              <input type="password"
              placeholder='enter your password'></input>
              <br/><br/>
              <button type="submit">Submit</button>
            </div>
  
        </div>
    </div>
  )
}

export default Login;