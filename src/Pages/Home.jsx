import React, { useState, useEffect } from 'react';
import Hero from '../Components/Home/Hero';
import Deals from '../Components/Home/Deals';
import SectionGrid from '../Components/Home/SectionGrid';
import InquiryForm from '../Components/Home/InquiryForm';
import Recommended from '../Components/Home/Recommended';
import Services from '../Components/Home/Services';
import SuppliersRegion from '../Components/Home/SuppliersRegion';
import Newsletter from '../Components/Home/Newsletter';
import { productAPI } from '../api/products';
import homeBanner from '../assets/Image/backgrounds/Group969.png';
import electronicsBanner from '../assets/Image/backgrounds/image98.png';

const Home = () => {
    const [homeOutdoorItems, setHomeOutdoorItems] = useState([]);
    const [electronicsItems, setElectronicsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Fetch products by category
                const homeProducts = await productAPI.getAll('Home interiors');
                const electronicsProducts = await productAPI.getAll('Computer and tech');
                
                setHomeOutdoorItems(homeProducts);
                setElectronicsItems(electronicsProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="lg:bg-[#EFF2F4] bg-white md-pb-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:bg-[#EFF2F4] bg-white pb-8">
            <Hero />
            <Deals />
            <SectionGrid 
               title="Home and outdoor" 
               bgImage={homeBanner} 
               items={homeOutdoorItems} 
               categoryLink="/category/home-interiors"
            />
            <SectionGrid 
               title="Consumer electronics" 
               bgImage={electronicsBanner} 
               items={electronicsItems} 
               categoryLink="/category/computer-and-tech"
            />
            <InquiryForm />
            <Recommended />
            <Services />
            <SuppliersRegion />
            <Newsletter />
        </div>
    );
};

export default Home;