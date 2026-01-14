import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../api/products';

const Recommended = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                setLoading(true);
                const allProducts = await productAPI.getAll();
                

                // Get first 10 products as recommended
                setItems(allProducts.slice(0, 10));
            } catch (error) {
                console.error('Error fetching recommended products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended items</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-md p-4 animate-pulse">
                            <div className="h-[140px] bg-gray-200 mb-4 rounded"></div>
                            <div className="h-6 bg-gray-200 mb-2 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-4">
             <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended items</h3>
             <div className=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                 {items.map((item) => (
                     <Link to={`/product/${item._id}`} key={item._id} className="bg-white border border-gray-200 rounded-md p-4 flex flex-col hover:shadow-md transition-shadow">
                         <div className="flex-1 flex items-center justify-center mb-4">
                             <img src={item.image} alt={item.description} className="max-h-[140px] max-w-full object-contain" />
                         </div>
                         <div className="font-bold text-gray-900 mb-1">${item.price}</div>
                         <div className="text-gray-500 text-sm">{item.description}</div>
                     </Link>
                 ))}
             </div>
        </div>
    );
};

export default Recommended;
