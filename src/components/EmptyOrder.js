import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function EmptyOrder() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Your Order History is Empty 📦</Card.Title>
              <Card.Text>
                It looks like you haven't placed any orders yet. Start shopping and come back here to view your order history.
              </Card.Text>
              <Button variant="primary" href="/products">
                Start Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
