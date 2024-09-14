import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserContext from '../context/UserContext';
import PreviewProducts from '../components/PreviewProducts';
import AdminView from '../components/AdminView';
import FilterProducts from '../components/FilterProducts';
import LoadingIndicator from '../components/LoadingInicator';

export default function CatalogPage() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const fetchUrl = user.isAdmin
            ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
            : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

        try {
            const response = await fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.isAdmin]);

    const handleFilter = (filters) => {
        let filtered = products;

        if (filters.name) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.minPrice !== undefined) {
            filtered = filtered.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter(product => product.price <= filters.maxPrice);
        }

        setFilteredProducts(filtered);
    };

    if (loading) return <LoadingIndicator />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            {user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <>
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        exit={{ y: -20, opacity: 0 }} 
                        transition={{ duration: 0.3 }}
                    >
                        <FilterProducts onFilter={handleFilter} />
                    </motion.div>
                    
                    <motion.h1 
                        className="text-center mt-5 mb-4 display-4 font-weight-bold text-primary"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.3 }}
                    >
                        Our Products
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <PreviewProducts productData={filteredProducts} />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}
