import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import CancelOrder from '../components/CancelOrder';
import LoadingIndicator from '../components/LoadingInicator';
import EmptyOrder from '../components/EmptyOrder';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Order() {
  const notyf = new Notyf();

  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); 
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok){
          throw new Error('Failed to fetch orders');
        }

        const data = await res.json();

        if (data.orders) {
          const ordersWithProducts = await Promise.all(data.orders.map(async (order) => {
            const products = order.productsOrdered ? await Promise.all(order.productsOrdered.map(async (product) => {
              try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product.productId}`);
                const productData = await res.json();
                
                return {
                  id: product.productId,
                  name: productData.name,
                  description: productData.description,
                  price: productData.price,
                  quantity: product.quantity
                };
              } catch (error) {
                console.error('Error fetching product details:', error);
                return null;
              }
            })) : []; 

            return {
              id: order._id,
              date: new Date(order.orderedOn).toLocaleDateString(), 
              products: products.filter(p => p !== null),
              status: order.status,
              totalPrice: order.totalPrice
            };
          }));

          setOrderItems(ordersWithProducts);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrderDetails();
  }, []);

  const calculateSubtotal = (price, quantity) => price * quantity;

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setOrderToCancel(null);
  }

  const confirmCancel = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderToCancel}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!res.ok){
        throw new Error('Failed to cancel this order');
      }

      setOrderItems(orderItems.filter(order => order.id !== orderToCancel));
      notyf.success('Order cancelled successfully');
      handleClose(); 
      
    } catch (error) {
      console.error('Error canceling order: ', error);
      setError('Failed to cancel this order');
    }
  }

  if (loading) {
    return <LoadingIndicator />; 
  }

  if (error || orderItems.length === 0) {
    return <EmptyOrder />;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-primary text-center my-5">Order Details</h2>
      <AnimatePresence>
        {orderItems.length > 0 ? (
          orderItems.map((order) => (
            <motion.div 
              key={order.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.3 }}
            >
              <Row className="mb-4">
                <Col md={6}>
                  <h4>Order ID: {order.id}</h4>
                  <p>
                    <strong>Order Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </Col>
              </Row>

              <motion.div 
                className="mb-5" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <Card className="border-primary">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Order Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>₱{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>₱{calculateSubtotal(item.price, item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-end mt-3">
                      <h5>Total: ₱{order.totalPrice}</h5>
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        variant="danger" 
                        onClick={() => handleCancelOrder(order.id)}
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>

              <hr className="my-4" />
            </motion.div>
          ))
        ) : (
          <EmptyOrder />
        )}
      </AnimatePresence>

      <CancelOrder
        showModal={showModal}
        handleClose={handleClose}
        confirmCancel={confirmCancel}
      />
    </Container>
  );
}
