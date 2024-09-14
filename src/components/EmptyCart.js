import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function EmptyCart() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Your Cart is Empty 🛒</Card.Title>
              <Card.Text>
                It looks like you haven't added anything to your cart yet. Start browsing our products and add them to your cart.
              </Card.Text>
              <Button variant="primary" href="/products">
                Browse Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
