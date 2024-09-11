import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light py-4">
        <Container>
            <Row className="text-center">
            <Col md={4}>
                <h5>Contact Us</h5>
                <p>
                <FaPhone className="me-2" />
                <a href="tel:+1234567890" className="text-light text-decoration-none">09123456789</a>
                </p>
                <p>
                <FaEnvelope className="me-2" />
                <a href="mailto:support@marketplace.com" className="text-light text-decoration-none">support@marketplace.com</a>
                </p>
            </Col>
            <Col md={4}>
                <h5>Follow Us</h5>
                <p>
                <a href="https://facebook.com" className="text-light me-3">
                    <FaFacebook size={30} />
                </a>
                <a href="https://twitter.com" className="text-light me-3">
                    <FaTwitter size={30} />
                </a>
                <a href="https://instagram.com" className="text-light">
                    <FaInstagram size={30} />
                </a>
                </p>
            </Col>
            <Col md={4}>
                <h5>About Marketplace</h5>
                <p>Marketplace is your go-to platform for buying and selling quality products. Explore our wide range of offerings, from electronics to fashion. Trusted by millions.</p>
                <p><em>"Connecting buyers and sellers worldwide."</em></p>
            </Col>
            </Row>
            <Row className="text-center mt-3">
            <Col>
                <p>&copy; {currentYear} Marketplace. All Rights Reserved.</p>
            </Col>
            </Row>
        </Container>
        </footer>
    );
}
