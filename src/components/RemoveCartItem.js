import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveCartItem = ({ showModal, handleClose, confirmRemove }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Removal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this item from your cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveCartItem;
