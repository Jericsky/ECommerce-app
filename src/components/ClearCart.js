import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

 export default function ClearCart({showCleartCartModal, handleCloseClearCartModal, confirmRemoveAll}){

    const [cartItems, setCartItems] = useState([]);


    return (
        <Modal show={showCleartCartModal} onHide={handleCloseClearCartModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Removal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove ALL items from your cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseClearCartModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmRemoveAll}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

