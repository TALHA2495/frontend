import React from 'react';

const Newsletter = () => {
    return (
        <div className=" bg-gray-100 py-12 text-center mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h3>
            <p className="text-gray-500 mb-6 text-sm">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="max-w-md mx-auto px-4 flex gap-2">
                 <div className="flex-1 relative">
                     <div className="absolute left-3 top-3 text-gray-400">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                           <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                         </svg>
                     </div>
                     <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                 </div>
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                     Subscribe
                 </button>
            </div>
        </div>
    );
};

export default Newsletter;
