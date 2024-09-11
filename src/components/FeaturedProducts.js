import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/active');
                const data = await response.json();

                if (data.length === 0) {
                    console.warn('No products available');
                    return;
                }

                const numbers = new Set();
                const featured = [];

                while (numbers.size < 5) {
                    numbers.add(Math.floor(Math.random() * data.length));
                }

                numbers.forEach(index => {
                    featured.push(
                        
                        <ProductCard 
                            key={data[index]._id}
                            productProp={data[index]} 
                            breakPoint={2} 
                        />
                    );
                });

                setPreviews(featured);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h2 className="featured-products-header text-primary text-center pt-5">Featured Products</h2>
            <CardGroup className='m-5'>
                {previews}
            </CardGroup>
        </>
    );
}
