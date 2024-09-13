import React from 'react';
import './Books.css'; // Import CSS for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Book App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
