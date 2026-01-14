import React from 'react';
import { Search, Globe, ShieldCheck, Truck, Archive, Send,Shield  } from 'lucide-react';

const Services = () => {
    const services = [
        { 
            icon: <Search className="w-5 h-5 text-gray-700" />, 
            title: "Source from Industry Hubs",
            bg: "bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300')]" 
        },
        { 
            icon: <Archive className="w-5 h-5 text-gray-700" />, 
            title: "Customize Your Products", 
            bg: "bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=300')]"
        },
        { 
            icon: <Send className="w-5 h-5 text-gray-700" />, 
            title: "Fast, reliable shipping by ocean or air",
            bg: "bg-[url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=300')]"
        },
        { 
            icon: <Shield className="w-5 h-5 text-gray-700" />, 
            title: "Product monitoring and inspection",
            bg: "bg-[url('https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=300')]"
        }
    ];

    return (
         <div className="hidden lg:block container mx-auto px-4 py-4">
             <h3 className="text-xl font-bold text-gray-900 mb-4">Our extra services</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {services.map((item, idx) => (
                     <div key={idx} className="bg-white border border-gray-200 rounded-md overflow-hidden relative group">
                         {/* Image Section */}
                         <div className={`h-32 ${item.bg} bg-cover bg-center`}></div>
                         
                         {/* Icon - Floating */}
                         <div className="absolute top-28 right-4 bg-blue-100 rounded-full p-2 border-2 border-white">
                             {item.icon}
                         </div>

                         {/* Content Section */}
                         <div className="p-4 pt-5 pb-5">
                              <h4 className="font-medium text-gray-900 w-3/4 text-sm leading-relaxed">{item.title}</h4>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
    );
};

export default Services;
