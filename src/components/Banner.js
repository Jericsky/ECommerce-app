import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data;

  return (
    <Container fluid className="text-center py-5 bg-light banner-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* <div className="p-5 bg-white shadow-lg rounded banner-content"> */}
            <h1 className="display-4 text-primary mb-3">{title}</h1>
            <p className="lead text-muted mb-3">{content}</p>
            <Link to={destination}>
              <Button variant="primary" size="lg" className="mt-3">
                {buttonLabel}
              </Button>
            </Link>
          {/* </div> */}
        </Col>
      </Row>
    </Container>
  );
}
