import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProducts';
import LoadingIndicator from '../components/LoadingInicator';// Fixed the import name

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
       
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    title: 'Welcome to Marketplace',
    content: 'Your one-stop shop for the best deals and exclusive products!',
    destination: '/products',
    buttonLabel: 'Go to Products'
  };

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <Banner data={data} />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
