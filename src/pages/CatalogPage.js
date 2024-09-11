import React, { useContext, useEffect, useState } from 'react';
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
            ? 'http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/all'
            : 'http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/active';

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

    if (loading) return <LoadingIndicator/>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <>
                    <FilterProducts onFilter={handleFilter} />
                    <h1 className="text-center mt-5 mb-4 display-4 font-weight-bold text-primary">
                        Our Products
                    </h1>
                    <PreviewProducts productData={filteredProducts} />
                </>
            )}
        </>
    );
}
