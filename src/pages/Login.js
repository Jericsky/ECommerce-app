import React, { useContext } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useState } from 'react';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Login() {
    
    const notyf = new Notyf();

    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function authenticate(e){

        e.preventDefault();

        fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/users/login', {
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

            if(data.access !== undefined){

                console.log(data.access);

                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                setEmail('');
                setPassword('');

                notyf.success('Successfull Login')

                navigate('/');
            } else if (data.error === 'Email and password do not match'){

                notyf.error("Incorrect Credentials. Try Again");
            } else {

                notyf.error('User Not Found. Try Again.')
            }
        })
    }

    function retrieveUserDetails(token){
        fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            });
        });
    };

    return (

        <>
{/* 
        (user.id !== null) ?
        <Navigate to='/productsCatalog'/>
        : */}


        <Container className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4} className="p-4 border-0 rounded shadow-sm">
                <h2 className="mb-4 text-center text-muted">Login</h2>
                <Form onSubmit={(e) => authenticate(e)}>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 text-muted">
                    <Form.Control   type="email" 
                                    placeholder="name@example.com"  
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                    
                    />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="text-muted">
                    <Form.Control   type="password" 
                                    placeholder="Password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </FloatingLabel>

                    <Button variant="primary" type="submit" className="w-100 mt-3" size="lg">
                        Submit
                    </Button>

                    <p className="mt-3 text-center text-muted">
                        Don't have an account yet? <Link to="/login">Click here</Link> to register.
                    </p>
                </Form>
                </Col>
            </Row>
        </Container>

        </>
    );
}
