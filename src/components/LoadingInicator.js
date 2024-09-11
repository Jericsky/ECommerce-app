import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingIndicator() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <div className="mt-3">Loading...</div>
            </div>
        </div>
    );
}


