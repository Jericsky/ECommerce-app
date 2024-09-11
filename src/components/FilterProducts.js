import React, { useState } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

export default function FilterProducts({ onFilter }) {
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilter = (e) => {
        e.preventDefault();

        const filters = {
            name: name.trim(),
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        };

        onFilter(filters);
    };

    return (
        <Card className="border-0 shadow-sm rounded mb-4">
            <Card.Body>
            <h4 className="mb-2">Product Search</h4>
                <Form onSubmit={handleFilter}>
                    <Row className="mb-3">
                        <Col md={12} lg={4}>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control-sm"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={4}>
                            <Form.Group controlId="formMinPrice">
                                <Form.Label>Minimum Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter minimum price"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="form-control-sm"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={4}>
                            <Form.Group controlId="formMaxPrice">
                                <Form.Label>Maximum Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter maximum price"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="form-control-sm"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-1 btn-sm">
                        Apply Filters
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
