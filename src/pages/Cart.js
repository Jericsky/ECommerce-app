import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import LoadingIndicator from '../components/LoadingInicator';
import EmptyCart from '../components/EmptyCart'; 
import RemoveCartItem from '../components/RemoveCartItem'; 
import ClearCart from '../components/ClearCart'; 
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { motion } from 'framer-motion';

export default function Cart() {

    const notyf = new Notyf();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [showCleartCartModal, setShowClearCartModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                
                const data = await res.json();
                if (data.cart && Array.isArray(data.cart.cartItems)) {
                    const items = data.cart.cartItems;

                    const fetchProductDetails = async (cartItem) => {
                        try {
                            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${cartItem.productId}`);
                            const productData = await res.json();

                            return {
                                id: cartItem.productId,
                                name: productData.name,
                                description: productData.description,
                                price: cartItem.subtotal,
                                quantity: cartItem.quantity
                            };
                        } catch (error) {
                            console.error('Error fetching product details:', error);
                            return null;
                        }
                    };

                    const resolvedItems = await Promise.all(items.map(item => fetchProductDetails(item)));
                    setCartItems(resolvedItems.filter(item => item !== null)); // Remove null values
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchCartItems();
    }, []);

    const handleIncrease = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrease = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleRemove = (itemId) => {
        setItemToRemove(itemId);
        setShowModal(true);
    };

    const confirmRemove = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${itemToRemove}/remove-from-cart`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!res.ok) {
                throw new Error('Failed to remove item from cart');
            }

            setCartItems(cartItems.filter(item => item.id !== itemToRemove));
            notyf.success('Removed')
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Failed to remove item from cart');
        } finally {
            setShowModal(false);
            setItemToRemove(null);
        }
    };

    const checkOut = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({}) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Ordered successfully'){
                notyf.success(data.message)
                navigate('/order')
            } else {
                notyf.error('Something went wrong')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleClose = () => {
        setShowModal(false);
        setItemToRemove(null);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleRemoveAll = () => {
        setShowClearCartModal(true);
    }

    const handleCloseClearCartModal = () => {
        setShowClearCartModal(false);
    }

    const confirmRemoveAll = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!res.ok) {
                throw new Error('Failed to remove all items from cart');
            }
    
            setCartItems([]); 
    
            notyf.success('Cart cleared');
    
        } catch (error) {
            console.error(error);
        } finally {
            setShowClearCartModal(false);
        }
    };

    if (loading) {
        return <LoadingIndicator />; 
    }

    if (cartItems.length === 0 || error){
        return <EmptyCart />;
    }

    return (
        <Container className="cart-container my-5">
            <motion.h2 
                className="mb-4 text-primary text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Shopping Cart
            </motion.h2>

            <div className="d-flex justify-content-end mb-2">
                <motion.button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveAll()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Clear Cart
                </motion.button>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="cart-card shadow-sm border-0 rounded">
                        <Card.Header className="cart-header text-primary">Your Items</Card.Header>
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ListGroup.Item className="cart-item">
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <h5 className="text-primary">{item.name}</h5>
                                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>{item.description}</p>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-center justify-content-center">
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleDecrease(item.id)}>
                                                    -
                                                </Button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleIncrease(item.id)}>
                                                    +
                                                </Button>
                                            </Col>
                                            <Col md={2} className="text-center text-success">
                                                <span>₱ {item.price}</span>
                                            </Col>
                                            <Col md={2} className="text-center">
                                                <Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.id)}>
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </motion.div>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="summary-card shadow-sm border-0 rounded">
                        <Card.Header className="text-primary">Summary</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Price:</Col>
                                        <Col className="text-end">₱ {totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Items:</Col>
                                        <Col className="text-end">{totalItems}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                            <motion.button
                                onClick={checkOut}
                                className="btn btn-primary w-100 mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                Proceed to Checkout
                            </motion.button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <RemoveCartItem
                showModal={showModal}
                handleClose={handleClose}
                confirmRemove={confirmRemove}
            />

            <ClearCart
                showCleartCartModal={showCleartCartModal}
                handleCloseClearCartModal={handleCloseClearCartModal}
                confirmRemoveAll={confirmRemoveAll}
            />
        </Container>
    );
}
