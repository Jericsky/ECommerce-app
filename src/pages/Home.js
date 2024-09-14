import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProducts';
import LoadingIndicator from '../components/LoadingInicator';

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

  // Animation hooks
  const bannerProps = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'translateY(-20px)' : 'translateY(0px)',
    config: { tension: 180, friction: 12 }
  });

  const featuredProps = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 180, friction: 12 },
    delay: 500 // delay for the FeaturedProducts
  });

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <animated.div style={bannerProps}>
        <Banner data={data} />
      </animated.div>
      <animated.div style={featuredProps}>
        <FeaturedProducts />
      </animated.div>
      <Footer />
    </>
  );
}
