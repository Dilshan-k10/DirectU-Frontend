import React, { useState } from 'react'; // Added useState for the dropdown
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Added the user profile icon
import logo from '../assets/logo.png'; 

const Navbar = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

        {/* Profile Avatar Button */}
        {/* Profile Avatar Button */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          // Changed from black to primary color, with an accent hover and slight popup effect
          className="text-primary hover:text-accent transition-all duration-300 focus:outline-none transform hover:scale-105 drop-shadow-sm"
        >
          <h1>Hi!, {getUser()?.name}  </h1>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 flex flex-col">
            
            {/* Profile Link */}
            <Link 
              to="/profile" 
              onClick={() => setIsDropdownOpen(false)} // Close dropdown when clicked
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
            >
              Profile
            </Link>
            
            {/* Divider Line */}
            <div className="h-[1px] bg-gray-100 w-full my-1"></div>
            
            {/* Logout Button */}
            <button 
              onClick={() => {
                setIsDropdownOpen(false);
                // Add your actual logout API call or state clear logic here later
                console.log("User Logged Out"); 
              }}
              className="px-5 py-2.5 text-sm font-semibold text-left text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
            
          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;