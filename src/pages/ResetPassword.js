import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(currentPassword)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
        notyf.error('New passwords do not match.');
        return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            currentPassword,
            newPassword
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
      if (data.message === 'Password reset successfully') {
        notyf.success(data.message);
        navigate('/profile'); 
      } else {
        notyf.error(data.error);
      }
    })
    .catch(() => {
      notyf.error('An error occurred. Please try again.');
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-primary">Reset Password</h2>
      <Form onSubmit={handleSubmit}>
      
        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;