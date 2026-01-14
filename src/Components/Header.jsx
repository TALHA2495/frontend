import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Home, LayoutGrid, User, X, MessageSquare, Heart, AlignJustify, ShoppingCart, Menu, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

import logo from '../assets/Layout/Brand/logo-colored.png';


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { user, logout, isAuthenticated } = useAuth();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchTerm)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200">

      
      
      {/* Top Header */}
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1 text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => setMobileMenuOpen(true)}
          >
            <AlignJustify className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Brand" className="h-8 md:h-[46px] block" />
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="flex w-full">
            <div className="relative">
              <input
                type="text"
                value="All category"
                readOnly
                className="h-11 px-4 border border-blue-500 rounded-l-md border-r-0 bg-white text-gray-700 w-32 cursor-pointer focus:outline-none"
              />
              <ChevronDown className="absolute right-2 top-3.5 w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-11 px-4 border border-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className="h-11 px-6 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          {/* Profile / Login */}
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex flex-col items-center text-gray-500 hover:text-blue-600 relative"
              >
                <div className="relative">
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                  {/* Green online indicator */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <span className="text-xs hidden md:block mt-1">{user?.name?.split(' ')[0] || 'Profile'}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link 
                      to="/admin/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-blue-600 font-medium"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
             <Link to="/login" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                <User className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs hidden md:block mt-1">Login</span>
            </Link>
          )}

          <Link to="/messages" className="hidden md:flex flex-col items-center text-gray-500 hover:text-blue-600">
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs mt-1">Message</span>
          </Link>
          <Link to="/orders" className="hidden md:flex flex-col items-center text-gray-500 hover:text-blue-600">
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-blue-600 relative">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
            <span className="text-xs hidden md:block mt-1">My cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    {/* Green online indicator */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <User className="w-10 h-10 text-gray-400 mb-2" />
                  <Link to="/login" className="text-sm text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                  {' | '}
                  <Link to="/register" className="text-sm text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              )}
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 space-y-2">
                <Link to="/" className="flex items-center gap-3 py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-6 h-6 flex items-center justify-center"><Home className="w-5 h-5" /></div>
                  Home
                </Link>
                <Link to="/categories" className="flex items-center gap-3 py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-6 h-6 flex items-center justify-center"><LayoutGrid className="w-5 h-5" /></div>
                  All categories
                </Link>
                <Link to="/favorites" className="flex items-center gap-3 py-2 text-gray-700 font-medium border-b border-gray-100 pb-4" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-6 h-6 flex items-center justify-center"><Heart className="w-5 h-5" /></div>
                  Favorites
                </Link>
                
                <div className="pt-4 space-y-4">
                  <Link to="/hot-offers" className="block py-1 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Hot offers</Link>
                  <Link to="/gift-boxes" className="block py-1 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Gift boxes</Link>
                  <Link to="/projects" className="block py-1 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                  <Link to="/menu-item" className="block py-1 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Menu item</Link>
                </div>
              </div>

              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t border-gray-100 px-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 py-2 text-red-600 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 px-4 space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>English | USD</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Contact us</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 pb-8">
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav (Desktop) */}
      <Navbar />
    </header>
  );
};

export default Header;
