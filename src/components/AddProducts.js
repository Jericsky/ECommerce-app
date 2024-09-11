import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function AddProducts({ show, handleClose, fetchData }) {
    const notyf = new Notyf();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSave = (e) => {
        e.preventDefault();

        fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data) {
                notyf.success('Successfully Added');
                setName('');
                setDescription('');
                setPrice('');
                fetchData();
            } else {
                notyf.error('Something went wrong');
            }
        });

        handleClose();
    };

    const isSaveDisabled = !name || !description || price <= 0;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => handleSave(e)}>
                    <Form.Group className="mb-3" controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProductDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
