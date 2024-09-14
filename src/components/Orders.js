import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Card } from 'react-bootstrap';
import LoadingIndicator from './LoadingInicator';
import { HiPrinter } from "react-icons/hi2";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Orders() {
    const notyf = new Notyf();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`;

        setLoading(true); 

        fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const sortedOrders = data.order.sort((a, b) => new Date(b.orderedOn) - new Date(a.orderedOn));
            setOrders(sortedOrders);
            setFilteredOrders(sortedOrders);
            setLoading(false); 
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            notyf.error('Something went wrong');
            setLoading(false); 
        });
    }, []);

    useEffect(() => {
        if (selectedMonth === 'All') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => {
                const orderDate = new Date(order.orderedOn);
                return (
                    orderDate.getMonth() === parseInt(selectedMonth) &&
                    orderDate.getFullYear() === parseInt(selectedYear)
                );
            });
            setFilteredOrders(filtered);
        }
    }, [selectedMonth, selectedYear, orders]);

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        const printContent = document.getElementById('printableContent').innerHTML;
        const selectedMonthName = selectedMonth === 'All' ? 'All' : new Date(0, selectedMonth).toLocaleString('default', { month: 'long' });

        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <title>Order Summary</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table th, table td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        table th {
                            background-color: #f4f4f4;
                            font-weight: bold;
                        }
                        .total-earnings {
                            margin-top: 20px;
                            font-size: 18px;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <h1>Order Summary for ${selectedMonthName} ${selectedYear}</h1>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Card className="border-primary mx-2 mx-sm-5 my-5">
            <Card.Header className="bg-primary text-white text-center p-3">
                <h3 className="mb-0">Order History</h3>
            </Card.Header>
            <Card.Body>
                {loading ? (
                    <LoadingIndicator /> 
                ) : (
                    <>
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3">
                            <Form.Group controlId="monthFilter" className="d-inline-block mb-2 mb-sm-0">
                                <Form.Label>Filter by Month</Form.Label>
                                <Form.Control as="select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    <option value="All">All</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="yearFilter" className="d-inline-block mb-2 mb-sm-0 ml-sm-3">
                                <Form.Label>Filter by Year</Form.Label>
                                <Form.Control as="select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                    {[new Date().getFullYear(), new Date().getFullYear() - 1].map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" className="ml-auto btn-lg mb-2 mb-sm-0" onClick={handlePrint} style={{ cursor: 'pointer' }}>
                                <HiPrinter />
                            </Button>
                        </div>

                        {/* Printable Content */}
                        <div id="printableContent">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Items</th>
                                        <th>Purchased on</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.userId}</td>
                                            <td>
                                                {order.productsOrdered.map(item => (
                                                    <div key={item._id}>{item.name} x {item.quantity}</div>
                                                ))}
                                            </td>
                                            <td>{new Date(order.orderedOn).toLocaleDateString()}</td>
                                            <td>₱{order.totalPrice.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-end mt-3">
                                <h5>Total Earnings for {selectedMonth === 'All' ? 'All Months' : new Date(0, selectedMonth).toLocaleString('default', { month: 'long' })}, {selectedYear}: ₱{filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2)}</h5>
                            </div>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
