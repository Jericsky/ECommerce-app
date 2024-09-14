import React, { useState, useContext, useEffect } from 'react';
import { Form, FloatingLabel, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import UserContext from '../context/UserContext';

export default function Register() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Password visibility toggle for password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Password visibility toggle for confirm password
    const [buttonVariant, setButtonVariant] = useState("primary");
    const [buttonText, setButtonText] = useState("Register");

    const isFormValid = () => {
        return firstName && lastName && email && mobileNo && password && confirmPassword && password === confirmPassword;
    };

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Registered successfully") {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');

                notyf.success("Registration successful");
            } else if (data.error) {
                notyf.error(data.error);
            } else {
                notyf.error("Something went wrong.");
            }
        });
    }

    useEffect(() => {
        if (isFormValid()) {
            setButtonVariant("primary");
            setButtonText("Register");
        } else {
            setButtonVariant("danger");
            setButtonText("Please enter your registration details");
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={8} lg={6} className="p-4 border-0 rounded shadow-sm">
                        <h2 className="mb-4 text-center text-muted">Register</h2>
                        <Form onSubmit={(e) => registerUser(e)}>
                            <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3 text-muted">
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3 text-muted">
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    required
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3 text-muted">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingMobileNo" label="Mobile Number" className="mb-3 text-muted">
                                <Form.Control
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Mobile Number"
                                    required
                                    value={mobileNo}
                                    onChange={e => setMobileNo(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 text-muted position-relative">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'} // Toggle input type
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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

                            <FloatingLabel controlId="floatingVerifyPassword" label="Verify Password" className="mb-3 text-muted position-relative">
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                                    name="verifyPassword"
                                    placeholder="Verify Password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    variant="link"
                                    className="position-absolute end-0 top-50 translate-middle-y"
                                    style={{ padding: '0', marginRight: '10px' }}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                                </Button>
                            </FloatingLabel>

                            <Button variant={buttonVariant} type="submit" className="w-100 mt-3" size="lg">
                                {buttonText}
                            </Button>

                            <p className="mt-3 text-center text-muted">
                                Already have an account? <Link to="/login">Click here</Link> to log in.
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
