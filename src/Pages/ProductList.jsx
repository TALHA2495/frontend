import React, { useState, useEffect } from 'react';
import { LayoutGrid, List as ListIcon, ChevronRight } from 'lucide-react';
import Sidebar from '../Components/ProductList/Sidebar';
import ProductItem from '../Components/ProductList/ProductItem';
import Newsletter from '../Components/Home/Newsletter';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { productAPI } from '../api/products';

const ProductList = () => {
    const [view, setView] = useState('list'); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    
    // Category mapping: URL slug -> Database category name
    const categoryMap = {
        'automobiles': 'Automobiles',
        'clothes-and-wear': 'Clothes and wear',
        'home-interiors': 'Home interiors',
        'computer-and-tech': 'Computer and tech',
        'tools,-equipments': 'Tools, equipments',
        'sports-and-outdoor': 'Sports and outdoor',
        'animal-and-pets': 'Animal and pets',
        'machinery-tools': 'Machinery tools',
        'more-category': 'More category'
    };

    // Get the actual category name from the URL slug
    const actualCategory = categoryName ? categoryMap[categoryName] : 'Clothes and wear';
    
    // Determine what to display as the title/breadcrumb
    const displayCategory = searchQuery 
        ? `Search results for "${searchQuery}"`
        : (actualCategory || 'All Products');
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let fetchedProducts = [];
                
                if (searchQuery) {
                    // Search mode: fetch all and filter client-side
                    const allProducts = await productAPI.getAll();
                    const query = searchQuery.toLowerCase();
                    fetchedProducts = allProducts.filter(p => 
                        p.name.toLowerCase().includes(query) || 
                        (p.category && p.category.toLowerCase().includes(query))
                    );
                } else {
                    // Category mode
                    fetchedProducts = await productAPI.getAll(actualCategory);
                }
                
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, actualCategory, searchQuery]); 

    if (loading) {
        return (
            <div className="bg-gray-50 py-4 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-4">
            <div className="container mx-auto px-4">
                 {/* Breadcrumb */}
                 <div className="hidden lg:flex items-center text-sm text-gray-500 mb-4 gap-2">
                     <Link to="/" className="hover:text-blue-600">Home</Link>
                     <ChevronRight className="w-4 h-4" />
                     <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                     <ChevronRight className="w-4 h-4" />
                     <span className="text-gray-900">{displayCategory}</span>
                 </div>

                  <div className="flex flex-col lg:flex-row gap-6">
                      <div className="hidden lg:block">
                          <Sidebar />
                      </div>
                      
                      <div className="flex-1">
                            {/* Mobile Top Bar */}
                           <div className="lg:hidden bg-white border-b border-gray-200 -mx-4 px-4 py-2 mb-4">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-4">
                                    {[
                                        { name: "All", slug: "" },
                                        { name: "Electronics", slug: "computer-and-tech" },
                                        { name: "Clothes", slug: "clothes-and-wear" },
                                        { name: "Home", slug: "home-interiors" },
                                        { name: "Automobiles", slug: "automobiles" }
                                    ].map((cat, idx) => (
                                        <Link 
                                            key={idx} 
                                            to={cat.slug ? `/category/${cat.slug}` : "/categories"}
                                            className={`px-4 py-1.5 rounded-lg text-sm border whitespace-nowrap ${
                                                (cat.slug === categoryName) || (!cat.slug && !categoryName) 
                                                ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' 
                                                : 'bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                     <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 flex-1 justify-center bg-white cursor-pointer hover:bg-gray-50">
                                         <span className="text-sm">Sort: Newest</span>
                                         <ChevronRight className="w-4 h-4 rotate-90" />
                                     </div>
                                     <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 flex-1 justify-center bg-white cursor-pointer hover:bg-gray-50">
                                         <span className="text-sm">Filter (3)</span>
                                     </div>
                                     <div className="flex border border-gray-200 rounded bg-white">
                                         <button 
                                            className={`p-2 ${view === 'grid' ? 'bg-gray-100' : ''}`}
                                            onClick={() => setView('grid')}
                                         >
                                             <LayoutGrid className="w-5 h-5" />
                                         </button>
                                         <button 
                                            className={`p-2 ${view === 'list' ? 'bg-gray-100 border-l border-gray-200' : 'border-l border-gray-200'}`}
                                            onClick={() => setView('list')}
                                         >
                                             <ListIcon className="w-5 h-5" />
                                         </button>
                                     </div>
                                </div>
                           </div>

                           {/* Desktop Top Bar */}
                           <div className="hidden lg:flex bg-white border border-gray-200 rounded-md p-3 mb-4 justify-between items-center gap-4">
                                <div className="text-gray-900 font-medium">{products.length} items in <span className="font-bold">{displayCategory}</span></div>
                                
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        Verified only
                                    </label>
                                    
                                    <div className="relative">
                                        <select className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none bg-white">
                                            <option>Featured</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                            <option>Newest</option>
                                        </select>
                                    </div>

                                    <div className="flex border border-gray-300 rounded overflow-hidden">
                                        <button 
                                           className={`p-2 ${view === 'grid' ? 'bg-gray-200 text-black' : 'bg-white text-gray-500'}`}
                                           onClick={() => setView('grid')}
                                        >
                                            <LayoutGrid className="w-5 h-5" />
                                        </button>
                                        <div className="w-[1px] bg-gray-300"></div>
                                        <button 
                                           className={`p-2 ${view === 'list' ? 'bg-gray-200 text-black' : 'bg-white text-gray-500'}`}
                                           onClick={() => setView('list')}
                                        >
                                            <ListIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                           </div>

                           {/* Active Filter Tags */}
                           <div className="flex flex-wrap gap-2 mb-4">
                                {['Samsung', 'Apple', 'Huawei', '64GB'].map((tag, idx) => (
                                    <div key={idx} className="bg-white border border-blue-100 rounded px-3 py-1.5 text-sm text-gray-700 flex items-center gap-2 hover:border-blue-300 transition-colors">
                                        {tag}
                                        <button className="text-gray-400 hover:text-gray-600">×</button>
                                    </div>
                                ))}
                                <button className="hidden lg:block text-blue-600 text-sm font-medium hover:underline px-2">Clear all filter</button>
                           </div>

                           {/* Products */}
                           {products.length > 0 ? (
                               <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4' : 'flex flex-col gap-3 md:gap-4'}>
                                    {products.map((product) => (
                                        <ProductItem key={product._id} product={product} viewType={view} />
                                    ))}
                               </div>
                           ) : (
                               <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                   <div className="text-gray-400 mb-4 flex justify-center">
                                       <Search className="w-12 h-12" />
                                   </div>
                                   <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                                   <p className="text-gray-500 mb-6">We couldn't find any products in this category. Try checking other categories.</p>
                                   <Link to="/categories" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                                       View All Products
                                   </Link>
                               </div>
                           )}
                           
                           {/* You may also like (Mobile) */}
                           <div className="lg:hidden mt-8">
                               <h3 className="text-lg font-bold mb-4">You may also like</h3>
                               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                                   {products.slice(0, 5).map((item) => (
                                       <div key={item._id} className="min-w-[150px] bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                                           <div className="aspect-square flex items-center justify-center mb-2">
                                               <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                                           </div>
                                           <div className="font-bold text-sm">${item.price}</div>
                                           <div className="text-xs text-gray-500 line-clamp-2">{item.description}</div>
                                       </div>
                                   ))}
                               </div>
                           </div>

                           {/* Pagination */}
                           <div className="flex justify-end mt-8 gap-2">
                                <div className="hidden sm:block relative">
                                    <select className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 bg-white">
                                        <option>Show 10</option>
                                        <option>Show 20</option>
                                    </select>
                                </div>
                                <div className="flex border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                                    <button className="px-3 md:px-4 py-1.5 md:py-2 border-r border-gray-200 text-gray-500 hover:bg-gray-50"> {'<'} </button>
                                    <button className="px-3 md:px-4 py-1.5 md:py-2 border-r border-gray-200 text-blue-600 font-bold bg-blue-50/50">1</button>
                                    <button className="px-3 md:px-4 py-1.5 md:py-2 border-r border-gray-200 text-gray-500 hover:bg-gray-50">2</button>
                                    <button className="px-3 md:px-4 py-1.5 md:py-2 border-r border-gray-200 text-gray-500 hover:bg-gray-50">3</button>
                                    <button className="px-3 md:px-4 py-1.5 md:py-2 text-gray-500 hover:bg-gray-50"> {'>'} </button>
                                </div>
                           </div>

                      </div>
                  </div>
            </div>
            <Newsletter />
        </div>
    );
};

export default ProductList;
