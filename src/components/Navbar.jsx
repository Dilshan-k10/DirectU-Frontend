import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-2 bg-gray-50 border-b border-gray-200">
      
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="DirectU Logo" 
          className="h-16 w-auto object-contain mr-3 transform hover:scale-105 transition duration-300" 
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 font-semibold text-blue-950">
        <Link to="/" className="hover:text-blue-700">Home</Link>
        <Link to="/about" className="hover:text-blue-700">About Us</Link>
        <Link to="/contact" className="hover:text-blue-700">Contact Us</Link>
        <button className="bg-[#2A528A] text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">
          Learn More
        </button>
      </div>
    </nav>
  );
};

export default Navbar;