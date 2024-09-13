import React from 'react';
import { Link } from 'react-router-dom';
import Profilepage from './Profilepage';
import './Books.css'; // Import the CSS for Header

const Header = () => {
  return (
    <header>
      <img 
        src="https://s3.eu-central-1.amazonaws.com/static.marcelwanders.com/assets/images/LIBRARY_HEADER_01_FJ_correct.jpg" 
        alt="Library Header"
      />
      <div className="header-content">
        <div className="logo">LOGO</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/Profilepage">Profilepage</Link>
          {/* <Link to="/Profile">Profile</Link>        */}
           </nav>
      </div>
    </header>
  );
};
export default Header;



