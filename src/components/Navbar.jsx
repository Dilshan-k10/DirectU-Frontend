import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-2 bg-gray-50 border-b border-gray-200">
      
      {/* Left Section: Grouping Logo and Navigation Links together */}
      <div className="flex items-center space-x-12 lg:space-x-20">
        
        {/* Logo Container */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="DirectU Logo" 
            className="h-16 w-auto object-contain mr-3 transform hover:scale-105 transition duration-300" 
          />
        </div>

        {/* Navigation Links - Styled with transparent padding that fills with blue on hover */}
        {/* Reduced space-x-8 to space-x-4 because the links now have horizontal padding (px-5) */}
        <div className="hidden md:flex items-center space-x-4 font-semibold text-blue-950">
          <Link 
            to="/" 
            className="px-5 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-white"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="px-5 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-white"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="px-5 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-white"
          >
            Contact Us
          </Link>
        </div>

      </div>

      {/* Right Section: Call to Action Button */}
      <div className="hidden md:block">
        <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-hover transition shadow-sm">
          Learn More
        </button>
      </div>

    </nav>
  );
};

export default Navbar;