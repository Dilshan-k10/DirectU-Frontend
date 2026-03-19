import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { getUser } from '../api/axiosClient';
import { logout } from '../services/authService';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    const syncUser = () => setUser(getUser());
    window.addEventListener("auth:login", syncUser);
    window.addEventListener("auth:logout", syncUser);
    return () => {
      window.removeEventListener("auth:login", syncUser);
      window.removeEventListener("auth:logout", syncUser);
    };
  }, []);

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

        {/* Navigation Links */}
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

      {/* Right Section: Call to Action Button & Profile Icon */}
      {/* Added 'relative' here so the absolute dropdown stays aligned to this container */}
      <div className="hidden md:flex items-center space-x-5 relative">
        
        <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-hover transition shadow-sm">
          Learn More
        </button>

        {/* user indicator */}

        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          // Changed from black to primary color, with an accent hover and slight popup effect
          className="text-primary hover:text-accent transition-all duration-300 focus:outline-none transform hover:scale-105 drop-shadow-sm"
        >
          <h1>Hello {user?.name || ""}!</h1>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 flex flex-col">
            
            {/* Logout Button */}
            <button 
              onClick={() => {
                setIsDropdownOpen(false);
                logout();
              }}
              className="px-5 py-2.5 text-sm font-semibold text-left text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined mr-2 text-[18px] text-red-500"><h3></h3></span>
            </button>
            
          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;