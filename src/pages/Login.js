import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import UserContext from '../context/UserContext';

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    if (user.id) {
        return <Navigate to="/" />;
    }

    function authenticate(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access !== undefined) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                setEmail('');
                setPassword('');

                notyf.success('Successful Login');

                navigate('/');
            } else if (data.error === 'Email and password do not match') {
                notyf.error('Incorrect Credentials. Try Again');
            } else {
                notyf.error('User Not Found. Try Again.');
            }
        });
    }

    function retrieveUserDetails(token) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4} className="p-4 border-0 rounded shadow-sm">
                    <h2 className="mb-4 text-center text-muted">Login</h2>
                    <Form onSubmit={(e) => authenticate(e)}>
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 text-muted">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="text-muted position-relative">
                            <Form.Control
                                type={showPassword ? 'text' : 'password'} // Toggle input type based on state
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="link"
                                className="position-absolute end-0 top-50 translate-middle-y"
                                style={{ padding: '0', marginRight: '10px' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                            </Button>
                        </FloatingLabel>

                        <Button variant="primary" type="submit" className="w-100 mt-3" size="lg">
                            Submit
                        </Button>

                        <p className="mt-3 text-center text-muted">
                            Don't have an account yet? <Link to="/register">Click here</Link> to register.
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
