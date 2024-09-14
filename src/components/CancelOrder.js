import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function CancelOrder({showModal, handleClose, confirmCancel}) {
  return (
    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Cancelation</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="danger" onClick={confirmCancel}>
            Remove
        </Button>
    </Modal.Footer>
</Modal>
  )
}

