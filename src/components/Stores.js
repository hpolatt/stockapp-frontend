import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllRecords, addRecord } from '../api/Services.js';
import '../css/List.css'; 

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [newStore, setNewStore] = useState({ name: '', description: '', notes: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getAllRecords("settings/stores")
            .then(data => setStores(data));
    }, []);

    const handleStoreSubmit = (e) => {
        e.preventDefault();
        addRecord("settings/stores", newStore)
            .then(data => setStores([...stores, data]));
        setNewStore({ name: '', description: '', notes: '' });
        setShowForm(false);
    };

    return (
        <div>
            <h2>Stores</h2>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Name</div>
                    <div className="forms-cell">Description</div>
                    <div className="forms-cell">Notes</div>
                </div>
                {stores.map(product => (
                    <div className="forms-row" key={product.id}>
                        <div className="forms-cell">{product.name}</div>
                        <div className="forms-cell">{product.description}</div>
                        <div className="forms-cell">{product.notes}</div>
                    </div>
                ))}
            </div>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleStoreSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newStore.name} onChange={e => setNewStore({ ...newStore, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newStore.description} onChange={e => setNewStore({ ...newStore, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type="text" value={newStore.notes} onChange={e => setNewStore({ ...newStore, notes: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={(event) => handleStoreSubmit(event)}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Stores;
