import React from 'react';  

import { Link } from 'react-router-dom';
import logo from '../assets/Layout/Brand/logo-colored.png'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="hidden lg:block bg-white pt-16 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid-cols-1 grid  md:grid-cols-6 gap-8 md:gap:2 llg:mb-16">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center bg-white">
                                    <img src={logo} alt="Brand" className="h-[46px] block " />
                                </Link>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Best information about the company gies here but now lorem ipsum is
                        </p>
                        <div className="flex items-center gap-3">
  <a
    href="#"
    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"
  >
    <Facebook size={16} />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"
  >
    <Twitter size={16} />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"
  >
    <Linkedin size={16} />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"
  >
    <Instagram size={16} />
  </a>

  <a
    href="#"
    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors"
  >
    <Youtube size={16} />
  </a>
</div>

                    </div>

                    <div>
                        <h3 className="font-medium text-black mb-4">About</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-500 hover:text-blue-600">About Us</Link></li>
                            <li><Link to="/find-store" className="text-gray-500 hover:text-blue-600">Find store</Link></li>
                            <li><Link to="/categories" className="text-gray-500 hover:text-blue-600">Categories</Link></li>
                            <li><Link to="/blogs" className="text-gray-500 hover:text-blue-600">Blogs</Link></li>
                        </ul>
                    </div>



                    <div>
                        <h3 className="font-medium text-black mb-4">Information</h3>
                        <ul className="space-y-2">
                            <li><Link to="/help" className="text-gray-500 hover:text-blue-600">Help Center</Link></li>
                            <li><Link to="/refund" className="text-gray-500 hover:text-blue-600">Money Refund</Link></li>
                            <li><Link to="/shipping" className="text-gray-500 hover:text-blue-600">Shipping</Link></li>
                            <li><Link to="/contact" className="text-gray-500 hover:text-blue-600">Contact us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-black mb-4">For users</h3>
                        <ul className="space-y-2">
                            <li><Link to="/login" className="text-gray-500 hover:text-blue-600">Login</Link></li>
                            <li><Link to="/register" className="text-gray-500 hover:text-blue-600">Register</Link></li>
                            <li><Link to="/settings" className="text-gray-500 hover:text-blue-600">Settings</Link></li>
                            <li><Link to="/orders" className="text-gray-500 hover:text-blue-600">My Orders</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-black mb-4 hidden lg:block">Get app</h3>
                         <div className="space-y-2">
                            <button className="flex items-center bg-black text-white px-3 py-2 rounded-md w-full max-w-[160px]">
                                <div className="mr-2">
                                     {/* Apple Icon */}
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.23-3.14-2.47-1.72-2.49-3.04-7.03-1.27-10.1 0.88-1.52 2.44-2.48 4.14-2.5 1.28-0.03 2.51.87 3.3.87 0.78 0 2.24-1.07 3.79-0.91 0.65 0.03 2.46.26 3.63 1.98-0.09.05-2.17 1.27-2.15 3.76 0.02 2.99 2.62 4 2.67 4.02-0.02.05-0.42 1.44-1.39 2.85zM15.22 3.86c0.68-0.84 1.15-2.01 1.02-3.17-0.99 0.04-2.2 0.66-2.92 1.5-0.62.72-1.16 1.88-1.02 3.01 1.1 0.08 2.23-0.5 2.92-1.34z"/></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] leading-tight">Download on the</div>
                                    <div className="text-sm font-semibold leading-tight">App Store</div>
                                </div>
                            </button>
                             <button className="flex items-center bg-black text-white px-3 py-2 rounded-md w-full max-w-[160px]">
                                <div className="mr-2">
                                    {/* Google Play Icon */}
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] leading-tight">Get it on</div>
                                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <div className="bg-gray-100 py-6 hidden lg:block">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-500 text-sm">© 2023 Ecommerce.</p>
                     <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="flex items-center gap-1 cursor-pointer text-gray-500 text-sm">
                           <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-5" />
                           English
                           <div className="border border-white border-t-0 border-r-0 transform rotate-45 w-[6px] h-[6px] mt-[-2px] border-b-gray-500 border-l-gray-500"></div>
                        </div>
                     </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;