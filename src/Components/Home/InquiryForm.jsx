import React from 'react';
import warehouse from '../../assets/Image/backgrounds/Mask group.png';

const InquiryForm = () => {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="rounded-lg md:rounded-md p-6 md:p-8 flex flex-col lg:flex-row justify-between relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${warehouse})` }}>
                <div className="absolute inset-0 bg-blue-600/80 md:bg-gradient-to-r md:from-blue-500 md:to-cyan-500 md:opacity-70"></div>
                
                <div className="text-white lg:max-w-md relative z-10 mb-6 lg:mb-0">
                    <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">An easy way to send requests to all suppliers</h3>
                    <p className="hidden md:block text-white/80">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                    </p>
                    <button className="md:hidden mt-2 bg-blue-600 border border-blue-400 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                        Send inquiry
                    </button>
                </div>

                <div className="hidden md:block bg-white rounded-md p-6 lg:w-[480px] relative z-10 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Send quote to suppliers</h3>
                    <form className="space-y-4">
                        <div>
                             <input type="text" placeholder="What item you need?" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                             <textarea placeholder="Type more details" rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <div className="flex gap-4">
                             <input type="text" placeholder="Quantity" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                             <select className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                                 <option>Pcs</option>
                                 <option>Kg</option>
                             </select>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            Send inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryForm;
