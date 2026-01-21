import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import banner from "../../assets/Image/backgrounds/Banner-board-800x420 2.png";

const Hero = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target);
      const clickedOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };
  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ];

  return (
    <div className="container  mx-auto px-4 py-4">
      <div className="bg-white rounded-md lg:border  border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-[250px_1fr_280px] gap-4">
        {/* Categories */}
        <div className="hidden md:block">
          <ul className="space-y-2">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <Link
                  to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                  className={`block px-2 py-1 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:font-medium transition-colors ${
                    idx === 0 ? "font-medium bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* {Cateories for Mobile} */}
        <div className=" md:hidden w-full min-h-1">
          <ul className="flex gap-2 overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
            {categories.map((cat, idx) => (
              <li key={idx} className="flex-shrink-0">
                <Link
                  to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-sm 
        border border-gray-200  hover:bg-blue-50 text-blue-600 
        transition-all${idx === 0? "bg-blue-50 text-blue-600 border-blue-300 font-medium": ""}`} >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Banner */}
        <div
          className="h-[360px] bg-cover bg-center rounded-md p-12 text-white flex flex-col justify-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <h2 className="text-2xl mb-1">Latest trending</h2>
          <h1 className="text-3xl font-bold mb-4">Electronic items</h1>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium w-fit hover:bg-gray-100">
            Learn more
          </button>
        </div>

        {/* User column - Desktop */}
        <div className="hidden lg:flex flex-col gap-3">
          {/* User Profile Section */}
          <div className="bg-blue-50 p-4 rounded-md">
            {isAuthenticated ? (
              // Logged in user view
              <div className="relative" ref={desktopDropdownRef}>
                <div 
                  className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold shadow-md">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {user?.email || ""}
                    </div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Guest view
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Hi, user</div>
                    <div className="text-xs text-gray-600">let's get started</div>
                  </div>
                </div>
                <button 
                  onClick={handleRegisterClick}
                  className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm font-medium mb-2 hover:bg-blue-700 transition-colors"
                >
                  Join now
                </button>
                <button 
                  onClick={handleLoginClick}
                  className="w-full bg-white border border-gray-300 text-blue-600 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </div>

          <div className="bg-orange-500 text-white p-4 rounded-md flex-1">
            <div className="text-sm opacity-90 mb-2">
              Get US $10 off with a new supplier
            </div>
          </div>

          <div className="bg-teal-400 text-white p-4 rounded-md flex-1">
            <div className="text-md opacity-90 mb-2">
              Send quotes with supplier preferences
            </div>
          </div>
        </div>

        {/* User Profile - Mobile & Tablet */}
        <div className="lg:hidden bg-blue-50 p-4 rounded-md">
          {isAuthenticated ? (
            // Logged in user view - Mobile
            <div className="relative" ref={mobileDropdownRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold shadow-md">
                  {getUserInitials()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800 truncate">
                    {user?.name || "User"}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {user?.email || ""}
                  </div>
                </div>
                <svg 
                  className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu - Mobile */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Guest view - Mobile
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex-1 flex gap-2">
                <button 
                  onClick={handleRegisterClick}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Join now
                </button>
                <button 
                  onClick={handleLoginClick}
                  className="flex-1 bg-white border border-gray-300 text-blue-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Log in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
