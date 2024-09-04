import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllRecords, addRecord } from '../api/Services.js';
import '../css/List.css';

const EntryExitForms = () => {
    const [forms, setForms] = useState([]);
    const [newForm, setNewForm] = useState({
        date: '',
        quantity: '',
        product_id: '',
        store_id: '',
        description: '',
        notes: '',
        type: 'entry' // default value
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getAllRecords("entry-exit-forms")
            .then(data => setForms(data));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        addRecord("entry-exit-forms", newForm)
            .then(data => setForms([...forms, data]));
        
        setNewForm({
            date: '',
            quantity: '',
            product_id: '',
            store_id: '',
            description: '',
            notes: '',
            type: 'entry'
        });
        setShowForm(false);
    };

    console.log(forms);
    return (
        <div>
            <h2>Entry/Exit Forms</h2>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Date</div>
                    <div className="forms-cell">Quantity</div>
                    <div className="forms-cell">Product</div>
                    <div className="forms-cell">Store</div>
                    <div className="forms-cell">Description</div>
                    <div className="forms-cell">Notes</div>
                    <div className="forms-cell">Type</div>
                </div>
                {forms.map(form => (
                    <div className="forms-row" key={form.id}>
                        <div className="forms-cell">{form.date}</div>
                        <div className="forms-cell">{form.quantity}</div>
                        <div className="forms-cell">{form.product_id}</div>
                        <div className="forms-cell">{form.store_id}</div>
                        <div className="forms-cell">{form.description}</div>
                        <div className="forms-cell">{form.notes}</div>
                        <div className="forms-cell">{form.type}</div>
                    </div>
                ))}
            </div>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Entry/Exit Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="datetime-local" value={newForm.date} onChange={e => setNewForm({ ...newForm, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={newForm.quantity} onChange={e => setNewForm({ ...newForm, quantity: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProductId">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control type="number" value={newForm.product_id} onChange={e => setNewForm({ ...newForm, product_id: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStoreId">
                            <Form.Label>Store ID</Form.Label>
                            <Form.Control type="number" value={newForm.store_id} onChange={e => setNewForm({ ...newForm, store_id: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newForm.description} onChange={e => setNewForm({ ...newForm, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type="text" value={newForm.notes} onChange={e => setNewForm({ ...newForm, notes: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={newForm.type} onChange={e => setNewForm({ ...newForm, type: e.target.value })}>
                                <option value="transfer">Transfer</option>
                                <option value="entry">Entry</option>
                                <option value="exit">Exit</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => setShowForm(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EntryExitForms;