import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Heart,
  MessageSquare,
  ShoppingBasket,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Newsletter from "../Components/Home/Newsletter";
import { productAPI } from "../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [youMayLike, setYouMayLike] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await productAPI.getOne(id);
        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData.images[0]);
        }

        const allProducts = await productAPI.getAll();
        
        // Filter out current product and set recommendations
        const otherProducts = allProducts.filter(p => p._id !== id);
        setYouMayLike(otherProducts.slice(0, 5));
        setRelatedProducts(otherProducts.slice(5, 11));
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-4 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-50 py-4 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Product not found</p>
            <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/categories" className="hover:text-blue-600">
            Clothings
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/men-wear" className="hover:text-blue-600">
            Men's wear
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Summer clothing</span>
        </div>

        {/* Top Section */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr_280px] gap-6">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="border border-gray-200 rounded p-2 h-[380px] flex items-center justify-center">
                <img
                  src={selectedImage || product.images[0]}
                  alt="Main"
                  className="max-h-full max-w-full object-contain cursor-pointer"
                />
              </div>
              <div className="flex gap-2 justify-center overflow-x-auto">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 border rounded p-1 cursor-pointer flex-shrink-0 ${
                        selectedImage === img ? 'border-gray-600' : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${i}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="text-green-500 text-sm font-medium mb-1">
                ✓ In stock
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-orange-400 font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="text-gray-500 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {product.reviews} reviews
                </div>
                <span className="text-gray-300">•</span>
                <div className="text-gray-500 flex items-center gap-1">
                  <ShoppingBasket className="w-4 h-4" />
                  {product.sold} sold
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-md flex justify-between mb-4">
                {product.priceInfo.map((p, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${
                      i !== 0 ? "border-l border-gray-300 pl-4" : ""
                    }`}
                  >
                    <div className="text-red-500 font-bold text-lg">
                      {p.price}
                    </div>
                    <div className="text-gray-500 text-sm">{p.qty}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm text-gray-600 mb-6">
                {product.details.map((item, i) => (
                  <div key={i} className="grid grid-cols-3">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="col-span-2 text-gray-700">
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-3 pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Customization:</span>
                  <span className="col-span-2 text-gray-700">
                    {product.customization}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Protection:</span>
                  <span className="col-span-2 text-gray-700">
                    {product.protection}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Warranty:</span>
                  <span className="col-span-2 text-gray-700">
                    {product.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="border border-gray-200 rounded-md p-4 h-fit shadow-sm">
              <div className="flex items-center gap-3 mb-4 p-2 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded flex items-center justify-center text-lg">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-medium">Supplier</div>
                  <div className="text-gray-500 text-sm">
                    Guanjoi Trading LLC
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <img
                    src="https://flagcdn.com/w20/de.png"
                    alt="Germany"
                    className="w-5"
                  />
                  Germany, Berlin
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
                  Verified Seller
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <GlobeIcon className="w-4 h-4 text-gray-400" />
                  Worldwide shipping
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white rounded-md py-2 font-medium mb-2 hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <ShoppingBasket className="w-5 h-5"/>
                Add to cart
              </button>
              <button className="w-full bg-white border border-gray-200 text-gray-700 rounded-md py-2 font-medium hover:bg-gray-50 mb-4">
                Seller's profile
              </button>

              <div 
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-blue-600"
              >
                <Heart className="w-4 h-4" />
                Save for later
              </div>
            </div>
          </div>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Tabs Section */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="flex border-b border-gray-200">
              {["Description", "Reviews", "Shipping", "About seller"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <div className="p-6 text-gray-600 leading-relaxed text-sm">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Model</span>
                    <span>#8786867</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Style</span>
                    <span>Classic style</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Certificate</span>
                    <span>ISO-898921212</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Size</span>
                    <span>34mm x 450mm x 19mm</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Memory</span>
                    <span>36GB RAM</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">✓</span> Some great feature
                  name here
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">✓</span> Lorem ipsum dolor sit
                  amet, consectetur
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">✓</span> Duis aute irure dolor
                  in reprehenderit
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">✓</span> Some great feature
                  name here
                </li>
              </ul>
            </div>
          </div>

          {/* You May Like */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">You may like</h3>
            <div className="space-y-4">
              {youMayLike.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <Link to={`/product/${item._id}`} className="border border-gray-200 rounded w-[80px] h-[80px] flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-gray-900 text-sm font-medium hover:text-blue-600 block mb-1 line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <div className="text-gray-500 text-sm">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white border border-gray-200 rounded-md p-6 mt-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Related products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.map((item, idx) => (
              <Link key={idx} to={`/product/${item._id}`} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-md h-[140px] flex items-center justify-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-[100px] max-w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="mb-1">
                  <h4 className="text-gray-800 text-sm font-medium group-hover:text-blue-600 truncate">
                    {item.name}
                  </h4>
                  <div className="text-gray-500 text-xs">${item.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Newsletter />
      </div>
    </div>
  );
};

// Helper icons (redefined locally as duplicates for simplicity if imported outside)
const ShieldCheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const GlobeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default ProductDetail;
