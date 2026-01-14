import React from 'react';

// Import flag icons
import AE from '../../assets/Layout1/Image/flags/AE@2x.png';
import US from '../../assets/Layout1/Image/flags/US@2x.png';
import RU from '../../assets/Layout1/Image/flags/RU@2x.png';
import IT from '../../assets/Layout1/Image/flags/IT@2x.png';
import DK from '../../assets/Layout1/Image/flags/DK@2x.png';
import FR from '../../assets/Layout1/Image/flags/FR@2x.png';
import CN from '../../assets/Layout1/Image/flags/CN@2x.png';
import GB from '../../assets/Layout1/Image/flags/GB@2x.png';
import DE from '../../assets/Layout1/Image/flags/DE@2x.png';

const SuppliersRegion = () => {
    const countries = [
        { name: "Arabic Emirates", code: "AE", domain: "shopname.ae", flag: AE },
        { name: "United States", code: "US", domain: "shopname.ae", flag: US },
        { name: "Russia", code: "RU", domain: "shopname.ru", flag: RU },
        { name: "Italy", code: "IT", domain: "shopname.it", flag: IT },
        { name: "Denmark", code: "DK", domain: "denmark.com.dk", flag: DK },
        { name: "France", code: "FR", domain: "shopname.com.fr", flag: FR },
        { name: "China", code: "CN", domain: "shopname.com.cn", flag: CN },
        { name: "Great Britain", code: "GB", domain: "shopname.co.uk", flag: GB },
        { name: "Germany", code: "DE", domain: "shopname.co.de", flag: DE },
    ];

    return (
        <div className="hidden lg:block container mx-auto px-4 py-8">
             <h3 className="text-xl font-bold text-gray-900 mb-6">Suppliers by region</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-4">
                 {countries.map((country, idx) => (
                     <div key={idx} className="flex items-center gap-3">
                         <img 
                             src={country.flag} 
                             alt={country.name} 
                             className="w-7 h-5 object-contain" 
                         />
                         <div>
                             <div className="text-sm font-medium text-gray-900">{country.name}</div>
                             <div className="text-xs text-gray-500">{country.domain}</div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

export default SuppliersRegion;
