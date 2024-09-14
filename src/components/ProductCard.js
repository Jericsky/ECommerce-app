import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/ProductCard.css'; 

export default function ProductCard({ productProp }) {
    const { _id, name, description, price } = productProp;

    return (
        <Card className="product-card border-0 shadow-sm rounded">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center text-primary mb-3">{name}</Card.Title>
                <Card.Text className="text-center text-muted mb-4" style={{ fontSize: '0.875rem' }}>
                    {description}
                </Card.Text>
                <div className="mt-auto text-center">
                    <Card.Text className="text-success" style={{ fontSize: '0.9rem' }}>
                        ₱ {price}
                    </Card.Text>
                    
                    <Link className="btn btn-primary mt-2" to={`/product/${_id}`}>Details</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired
};
