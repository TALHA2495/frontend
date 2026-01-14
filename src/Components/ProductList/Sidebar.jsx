import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

const Sidebar = () => {
    const [expanded, setExpanded] = useState({
        category: true,
        brands: true,
        features: true,
        price: true,
        condition: true,
        ratings: true
    });

    const toggle = (section) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-full lg:w-[240px] flex-shrink-0 space-y-4">
            {/* Category */}
            <div>
                <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('category')}>
                    Category
                    {expanded.category ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.category && (
                    <ul className="text-gray-600 space-y-2 mt-2 text-sm">
                        <li className="hover:text-blue-600 cursor-pointer">Mobile accessory</li>
                        <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
                        <li className="hover:text-blue-600 cursor-pointer">Smartphones</li>
                        <li className="hover:text-blue-600 cursor-pointer">Modern tech</li>
                        <li className="text-blue-600 cursor-pointer text-xs mt-1">See all</li>
                    </ul>
                )}
            </div>
            
            <hr className="border-gray-200"/>

            {/* Brands */}
            <div>
                 <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('brands')}>
                    Brands
                    {expanded.brands ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.brands && (
                    <div className="space-y-2 mt-2">
                        {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand) => (
                            <label key={brand} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                {brand}
                            </label>
                        ))}
                         <div className="text-blue-600 cursor-pointer text-xs mt-1">See all</div>
                    </div>
                )}
            </div>

            <hr className="border-gray-200"/>

            {/* Features */}
            <div>
                 <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('features')}>
                    Features
                    {expanded.features ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.features && (
                     <div className="space-y-2 mt-2">
                        {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map((feat) => (
                            <label key={feat} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                {feat}
                            </label>
                        ))}
                        <div className="text-blue-600 cursor-pointer text-xs mt-1">See all</div>
                    </div>
                )}
            </div>

             <hr className="border-gray-200"/>

             {/* Price Range */}
             <div>
                <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('price')}>
                    Price range
                    {expanded.price ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.price && (
                    <div className="mt-2">
                         <div className="flex items-center justify-between gap-4 mb-4">
                             <div className="w-full h-1 bg-gray-200 rounded relative">
                                  <div className="absolute left-0 w-1/2 h-full bg-blue-500 rounded"></div>
                                  <div className="absolute left-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full top-1/2 transform -translate-y-1/2 shadow cursor-pointer"></div>
                                  <div className="absolute left-0 w-4 h-4 bg-white border border-gray-300 rounded-full top-1/2 transform -translate-y-1/2 shadow cursor-pointer"></div>
                             </div>
                         </div>
                         <div className="flex gap-2">
                             <div className="flex-1">
                                 <label className="text-xs text-gray-500 block mb-1">Min</label>
                                 <input type="text" placeholder="0" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500" />
                             </div>
                             <div className="flex-1">
                                 <label className="text-xs text-gray-500 block mb-1">Max</label>
                                 <input type="text" placeholder="99999" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500" />
                             </div>
                         </div>
                         <button className="w-full mt-3 bg-white border border-gray-300 text-blue-600 py-1 rounded text-sm font-medium hover:bg-gray-50">
                             Apply
                         </button>
                    </div>
                )}
             </div>

             <hr className="border-gray-200"/>

              {/* Condition */}
              <div>
                <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('condition')}>
                    Condition
                    {expanded.condition ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.condition && (
                    <div className="space-y-2 mt-2">
                         <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="radio" name="condition" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                                Any
                        </label>
                        <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="radio" name="condition" className="text-blue-600 focus:ring-blue-500" />
                                Refurbished
                        </label>
                        <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="radio" name="condition" className="text-blue-600 focus:ring-blue-500" />
                                Brand new
                        </label>
                        <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                <input type="radio" name="condition" className="text-blue-600 focus:ring-blue-500" />
                                Old items
                        </label>
                    </div>
                )}
             </div>

             <hr className="border-gray-200"/>

             {/* Ratings */}
             <div>
                <div className="flex justify-between items-center py-2 cursor-pointer font-bold text-gray-800" onClick={() => toggle('ratings')}>
                    Ratings
                    {expanded.ratings ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
                {expanded.ratings && (
                    <div className="space-y-2 mt-2">
                        {[5, 4, 3, 2].map((stars) => (
                             <label key={stars} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <div className="flex text-orange-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </label>
                        ))}
                    </div>
                )}
             </div>
        </aside>
    );
};

export default Sidebar;
