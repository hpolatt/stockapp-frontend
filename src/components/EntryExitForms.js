import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/EntryExitForms.css';

const EntryExitForms = () => {
    const [forms, setForms] = useState([]);
    const [newForm, setNewForm] = useState({ type: '', date: '', productId: '', quantity: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch entry/exit forms
        fetch("/api/entry-exit-forms")
            .then(response => response.json())
            .then(data => setForms(data));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Send new form via API
        fetch("/api/entry-exit-forms", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newForm)
        }).then(response => response.json())
            .then(data => setForms([...forms, data]));

        setShowForm(false);
        setNewForm({ type: '', date: '', productId: '', quantity: '' });
    };


    return (
        <div>
            <h1>Entry/Exit Forms</h1>
            <Button variant="primary" onClick={() => setShowForm(true)} style={{position: 'fixed', bottom: '40px', right: '40px'}}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" value={newForm.type} onChange={e => setNewForm({ ...newForm, type: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={newForm.date} onChange={e => setNewForm({ ...newForm, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProductId">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control type="text" value={newForm.productId} onChange={e => setNewForm({ ...newForm, productId: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={newForm.quantity} onChange={e => setNewForm({ ...newForm, quantity: parseInt(e.target.value) })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="myForm">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EntryExitForms;