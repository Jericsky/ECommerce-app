import React from 'react'
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {

    console.log(productProp)

    const {_id, name, description, price} = productProp;

    return (

        <Card className="border-0 shadow-sm rounded card-hover">
            <Card.Body className="p-4">
                <Card.Title className="text-center text-primary mb-3">{name}</Card.Title>
                <Card.Text className="text-center text-muted mb-4" style={{ fontSize: '0.875rem' }}>
                    {description}
                </Card.Text>
                <Card.Text className="text-center text-success" style={{ fontSize: '0.9rem' }}>
                    PhP {price}
                </Card.Text>
                <div className="text-center">
                    <Link className="btn btn-primary" to={`/product/${_id}`}>Details</Link>
                </div>
            </Card.Body>
        </Card>


        
    )
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}

