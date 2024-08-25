import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
        { <Route path="/" element={<Login />} /> }
        { <Route path="/signup" element={<Signup />} /> }
       
        </Routes>
      </BrowserRouter>



      {/* <Signup/> */}
    </div>
  );
}

export default App;
