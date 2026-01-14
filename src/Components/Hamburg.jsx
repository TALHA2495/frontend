import React, { useState } from "react";
import { X, ChevronDown, AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

const Hamburg = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AlignJustify className="w-6 h-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[250px] bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 font-medium text-gray-700">
              <Link
                to="/"
                className="flex items-center gap-2 py-2 border-b border-gray-100"
              >
                All category
              </Link>
              <Link to="/hot-offers" className="py-2 border-b border-gray-100">
                Hot offers
              </Link>
              <Link to="/gift-boxes" className="py-2 border-b border-gray-100">
                Gift boxes
              </Link>
              <Link to="/projects" className="py-2 border-b border-gray-100">
                Projects
              </Link>
              <Link to="/menu-item" className="py-2 border-b border-gray-100">
                Menu item
              </Link>
              <Link
                to="/help"
                className="py-2 border-b border-gray-100 flex justify-between"
              >
                Help
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 py-2">
                <span>English, USD</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <span>Ship to 🇩🇪</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hamburg;
