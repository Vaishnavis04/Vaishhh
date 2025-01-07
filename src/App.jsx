// App.jsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { UserProvider } from "./components/UserContext";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from './Forgetpassword/ForgotPassword';
import ChangePassword from "./Forgetpassword/ChangepasswordPage";
import PasswordChanged from "./Forgetpassword/PasswordChanged";
function App() {
  return (
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/password-changed" element={<PasswordChanged />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/bookspage" element={<BooksPage />} />
              <Route path="/profilepage" element={<Profilepage />} /> */}
            </Routes>
          </main>
        </div>
      </Router>  
  );
}

export default App;
