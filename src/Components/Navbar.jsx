import React, { useState } from "react";
import { Menu, ChevronDown, AlignJustify, X } from "lucide-react";
import { Link } from "react-router-dom";
import DE from "../assets/Layout1/Image/flags/DE@2x.png";

import Hamburg from "./Hamburg";

const Navbar = () => {

  return (
    <>
      <div className="border-t border-gray-200 hidden lg:block bg-white">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between text-sm">

          {/* Left Links */}
            <div className="flex items-center gap-6 font-medium text-gray-700">
              <Hamburg />
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <span>All category</span>
              </button>
              <Link
                to="/hot-offers"
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Hot offers
              </Link>
              <Link
                to="/gift-boxes"
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Gift boxes
              </Link>
              <Link
                to="/projects"
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/menu-item"
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Menu item
              </Link>
              <div className="relative group flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                <span>Help</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

          {/* Right Settings */}
          <div className="flex items-center gap-6 text-gray-600">
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <span>English, USD</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="relative group flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <span>Ship to</span>
              <img src={DE} alt="Germany" className="w-5" />
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Navbar;
