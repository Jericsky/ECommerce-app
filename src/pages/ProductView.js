import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function ProductView() {
    const notyf = new Notyf();
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/${productId}`)
            .then(res => res.json())
            .then(data => {

                if (data) {
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                } else {
                    notyf.error('Product not found');
                }
            })
            .catch(() => notyf.error('Failed to load product'));
    }, [productId]);

    const addToCart = () => {
        if (quantity <= 0) {
            notyf.error('Quantity should be greater than 0');
            return;
        }
    
        fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/cart/add-to-cart', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
                quantity, // Send quantity directly, not inside cart array
                totalPrice: price * quantity
            })
        })
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Response data:", data);
            if (data.error) {
                notyf.error(data.error);
            } else {
                notyf.success('Added to Cart.');
                navigate('/productsCatalog'); 
            }
        })
        .catch(error => {
            console.error("Error adding to cart:", error);
            notyf.error('Failed to add product to cart');
        });
    }
    
    




    const handleQuantityChange = (event) => {
        const value = Number(event.target.value);
        if (value >= 1) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };
    

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    console.log(quantity)

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card className="border-0 shadow-sm rounded card-hover">
                        <Card.Body className="p-4 text-center">
                            <Card.Title className="text-primary mb-3">{name}</Card.Title>
                            <Card.Text className="text-muted mb-4" style={{ fontSize: '0.875rem' }}>
                                {description}
                            </Card.Text>
                            <Card.Text className="text-success" style={{ fontSize: '0.9rem' }}>
                                PhP {price}
                            </Card.Text>
                            
                            <Form.Group className="mb-4">
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button variant="outline-secondary" onClick={decrementQuantity}>-</Button>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="mx-2"
                                        min="1" // Ensure input can't be less than 1
                                        style={{ width: '60px' }}
                                    />

                                    <Button variant="outline-secondary" onClick={incrementQuantity}>+</Button>
                                </div>
                            </Form.Group>
                            
                            <Button variant="primary" onClick={addToCart} className="w-100">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
