// App.js
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { UserProvider } from "./components/UserContext";
import Login from "./Login";
import Signup from "./Signup";
import Profilepage from "./components/Profilepage";
import BooksPage from "./components/BooksPage";

function App() {
  return (
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/bookspage" element={<BooksPage />} />
              <Route path="/profilepage" element={<Profilepage />} />
            </Routes>
          </main>
        </div>
      </Router>
    
  );
}

export default App;
