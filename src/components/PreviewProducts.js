import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

export default function PreviewProducts({ productData }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(productData);

        const productArray = productData.map(product => {
            if (product.isActive === true) {
                return (
                    <Col
                        key={product._id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={4}
                        className="px-5 my-2 my-md-4"
                        >
                        <ProductCard productProp={product} />
                    </Col>


                );
            } else {
                return null;
            }
        });

        setProducts(productArray);
    }, [productData]);

    return (
        <Container>
            <Row>
                {products}
            </Row>
        </Container>
    );
}
