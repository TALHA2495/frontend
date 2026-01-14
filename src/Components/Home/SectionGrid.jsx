import React from 'react';
import { Link } from 'react-router-dom';

const SectionGrid = ({ title, bgImage, items, categoryLink }) => {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="bg-white border border-gray-200 rounded-md flex flex-col lg:flex-row min-h-0">
                {/* Banner Side (Desktop) */}
                <div 
                    className="hidden lg:block w-full lg:w-[280px] p-6 text-gray-800 bg-cover bg-center shrink-0 relative"
                    style={{ backgroundImage: `url(${bgImage})` }} >
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4 w-3/4">{title}</h3>
                        <button className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                            Source now
                        </button>
                    </div>
                </div>

                {/* Title (Mobile) */}
                <div className="lg:hidden px-4 pt-4 pb-2 border-b border-gray-100">
                    <h2 className='text-lg font-bold text-gray-900'>{title}</h2>
                </div>

                {/* Grid Side */}
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 w-full">
                     {items.slice(0, 8).map((item, idx) => (
                         <Link to={`/product/${item._id}`} key={idx} className="p-3 md:p-4 flex flex-col-reverse lg:flex-row justify-between lg:items-center h-auto lg:h-[130px] bg-white group border-r lg:border-b-0 border-gray-100 gap-2 lg:gap-0">
                             <div className="flex flex-col min-h-0 justify-start pt-1 min-w-0 lg:pr-2 w-full">
                                 <h4 className="text-gray-900 text-sm font-medium mb-1 line-clamp-2 md:line-clamp-2">{item.name}</h4>
                                 <p className="text-gray-500 text-xs truncate">From USD {item.price}</p>
                             </div>
                             <div className="w-[100px] h-[100px] lg:w-[82px] lg:h-[82px] flex items-center justify-center shrink-0 mx-auto lg:mx-0">
                                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                             </div>
                         </Link>
                     ))}
                </div>

                {/* Source Now (Mobile) */}
                <div className="lg:hidden px-4 py-3 border-t border-gray-100 bg-white">
                    <Link to={categoryLink || "/categories"} className="text-blue-600 font-medium text-sm flex items-center gap-2">
                        Source now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SectionGrid;
