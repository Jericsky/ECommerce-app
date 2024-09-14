import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function EditProducts({ product, fetchData }) {

    const notyf = new Notyf();

    const [showEdit, setShowEdit] = useState(false);

    const [productId, setProductId ] = useState(product._id);

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price)
    
    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const editProduct = (e, productId) => {
        e.preventDefault();
 
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.success === 'true'){
                notyf.success('Successfully Updated')
                closeEdit();
                fetchData();
            } else {
                notyf.error('Something went wrong')
                closeEdit();
                fetchData();
            }
        })
    }



    return (
        <>
        <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
            Update
        </Button>

        <Modal show={showEdit} onHide={closeEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Form.Group controlId="formProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="formProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='mt-3'>
                    Save Changes
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeEdit}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
