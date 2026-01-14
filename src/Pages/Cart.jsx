import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowLeft, ShoppingCart, Lock, MessageCircle, Truck, X
} from "lucide-react";
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/features/cart';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    };

    const subtotal = cartItems.reduce((acc, item) => {
        const itemPrice = parsePrice(item.price);
        return acc + (itemPrice * item.quantity);
    }, 0);
    const shipping = 10.00;
    const tax = 7.00;
    const total = subtotal + shipping + tax;

    const savedForLater = [
        { name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://images.unsplash.com/photo-1551028919-ac66e624eca1?auto=format&fit=crop&q=80&w=150" },
        { name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150" },
    ];

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQty) => {
        if (newQty > 0) {
            dispatch(updateQuantity({ _id: id, quantity: newQty }));
        }
    };

    if (cartItems.length === 0) {
        return (
             <div className="bg-gray-50 py-8 min-h-[60vh]">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                        Start Shopping
                    </Link>
                </div>
             </div>
        )
    }

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                 {/* Mobile Header */}
                 <div className="lg:hidden flex items-center gap-4 py-4 mb-2">
                     <Link to="/">
                         <ArrowLeft className="w-6 h-6 text-gray-700" />
                     </Link>
                     <h2 className="text-xl font-bold text-gray-800">Shopping cart</h2>
                 </div>

                 <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">My cart ({cartItems.length})</h2>
                 
                 <div className="flex flex-col lg:flex-row gap-6">
                     {/* Cart Items Column */}
                     <div className="flex-1">
                         <div className="bg-white border-y md:border border-gray-200 md:rounded-md shadow-sm mb-6 -mx-4 md:mx-0">
                             {cartItems.map((item, idx) => (
                                 <div key={item._id} className={`p-4 ${idx !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                     <div className="flex gap-4 mb-3">
                                         <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center shrink-0">
                                             <img src={item.images && item.images[0]} alt={item.name} className="max-h-full max-w-full object-contain" />
                                         </div>
                                         <div className="flex-1 min-w-0">
                                             <div className="flex justify-between items-start">
                                                 <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{item.name}</h3>
                                                 <button onClick={() => handleRemove(item._id)} className="text-gray-400 p-1 hover:text-red-500"><X className="w-5 h-5" /></button>
                                             </div>
                                             {/* Dummy props for size/color as backend might not have them yet */}
                                             <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                 Size: Medium, Color: Blue
                                             </p>
                                             <p className="text-xs md:text-sm text-gray-400">Seller: Artel Market</p>
                                         </div>
                                     </div>
                                     
                                     <div className="flex justify-between items-center">
                                         <div className="flex border border-gray-300 rounded overflow-hidden">
                                             <button 
                                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 text-gray-600"
                                                disabled={item.quantity <= 1}
                                             >
                                                -
                                             </button>
                                             <div className="px-4 py-1 flex items-center justify-center text-sm font-medium w-12">{item.quantity}</div>
                                             <button 
                                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 text-gray-600"
                                             >
                                                +
                                             </button>
                                         </div>
                                         <div className="font-bold text-gray-900 text-base md:text-lg">${(parsePrice(item.price) * item.quantity).toFixed(2)}</div>
                                     </div>

                                     <div className="hidden md:flex gap-3 mt-4">
                                         <button onClick={() => handleRemove(item._id)} className="px-3 py-1 border border-gray-200 rounded text-red-500 text-xs font-medium hover:bg-gray-50">Remove</button>
                                         <button className="px-3 py-1 border border-gray-200 rounded text-blue-600 text-xs font-medium hover:bg-gray-50">Save for later</button>
                                     </div>
                                 </div>
                             ))}
                             
                             <div className="p-4 flex justify-between items-center bg-gray-50/50">
                                  <Link to="/" className="text-blue-600 font-medium text-sm flex items-center gap-2">
                                      <ArrowLeft className="w-4 h-4" />
                                      Back to shop
                                  </Link>
                                  <button onClick={() => dispatch(clearCart())} className="text-blue-600 font-medium text-sm hover:underline">
                                      Remove all
                                  </button>
                             </div>
                         </div>
                         
                         {/* Features (Desktop) */}
                         <div className="hidden lg:grid grid-cols-3 gap-4 mb-8">
                             {[
                                 { icon: Lock, title: "Secure payment", desc: "Have you ever finally" },
                                 { icon: MessageCircle, title: "Customer support", desc: "Have you ever finally" },
                                 { icon: Truck, title: "Free delivery", desc: "Have you ever finally" }
                             ].map((feat, i) => (
                                 <div key={i} className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                         <feat.icon className="w-5 h-5" />
                                     </div>
                                     <div>
                                         <div className="text-gray-900 font-medium text-sm">{feat.title}</div>
                                         <div className="text-gray-400 text-xs">{feat.desc}</div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Checkout Column */}
                     <div className="w-full lg:w-[320px]">
                         <div className="bg-white border-y md:border border-gray-200 md:rounded-md p-4 shadow-sm mb-4 -mx-4 md:mx-0">
                             <div className="space-y-3 mb-6">
                                 <div className="flex justify-between text-gray-600">
                                     <span>Items ({cartItems.length}):</span>
                                     <span>${subtotal.toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between text-gray-600">
                                     <span>Shipping:</span>
                                     <span>${shipping.toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between text-gray-600">
                                     <span>Tax:</span>
                                     <span>${tax.toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                     <span className="text-gray-900 font-bold">Total:</span>
                                     <span className="text-gray-900 font-bold text-xl">${total.toFixed(2)}</span>
                                 </div>
                             </div>
                             <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-base hover:bg-green-600 transition-colors shadow-sm">
                                 Checkout ({cartItems.length} items)
                             </button>
                             
                             <div className="hidden lg:flex justify-center gap-3 mt-6">
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-5" alt="Visa" />
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="Paypal" />
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Saved for Later */}
                 <div className="mt-8">
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Saved for later</h3>
                     <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
                         {savedForLater.map((item, idx) => (
                             <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 flex md:flex-col gap-4 items-center md:items-start hover:shadow-sm transition-shadow">
                                   <div className="w-[80px] h-[80px] md:w-full md:h-[160px] flex items-center justify-center shrink-0">
                                       <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                   </div>
                                   <div className="flex-1">
                                       <h4 className="text-gray-800 text-sm font-medium line-clamp-2 mb-1">{item.name}</h4>
                                       <div className="font-bold text-gray-900 mb-3">{item.price}</div>
                                       <div className="flex gap-2">
                                           <button className="flex-1 md:flex-none border border-gray-200 px-3 py-1.5 rounded-lg text-blue-600 text-xs font-semibold hover:bg-gray-50">
                                               Move to cart
                                           </button>
                                            <button className="md:hidden border border-gray-200 px-3 py-1.5 rounded-lg text-red-500 text-xs font-semibold hover:bg-gray-50">
                                               Remove
                                           </button>
                                       </div>
                                   </div>
                             </div>
                         ))}
                     </div>
                 </div>
                 
                 {/* Blue Banner (Desktop) */}
                 <div className="hidden lg:flex mt-12 bg-blue-600 rounded-lg p-8 justify-between items-center relative overflow-hidden">
                      <div className="absolute right-0 top-0 h-full w-1/2 bg-blue-500 transform skew-x-[-20deg] translate-x-20"></div>
                      <div className="relative z-10 text-white">
                          <h3 className="text-2xl font-bold mb-1">Super discount on more than 100 USD</h3>
                          <p className="opacity-80 text-sm">Have you ever finally just write dummy info</p>
                      </div>
                      <button className="relative z-10 bg-orange-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 shadow-lg transition-transform hover:scale-105">
                          Shop now
                      </button>
                 </div>
            </div>
        </div>
    );
};

export default Cart;
