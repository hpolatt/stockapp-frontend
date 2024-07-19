import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [newStore, setNewStore] = useState({ name: '', sku: '', quantity: 0 });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        // Ürünleri fetch ile alın
        fetch("/api/settings/stores")
            .then(response => response.json())
            .then(data => setStores(data));
    }, []);

    const handleStoreSubmit = (e) => {
        e.preventDefault();
        // Yeni ürünü API ile gönder
        fetch("/api/settings/stores", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStore)
        }).then(response => response.json())
          .then(data => setStores([...stores, data]));

        setNewStore({ name: '', sku: '', quantity: 0 });
    };

    return (
        <div>
            <h2>Stores</h2>
            <ul>
                {stores.map(store => (
                    <li key={store.id}>{store.name} - {store.sku} - {store.quantity}</li>
                ))}
            </ul>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleStoreSubmit}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newStore.type} onChange={e => setNewStore({ ...newStore, type: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" value={newStore.date} onChange={e => setNewStore({ ...newStore, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStoreId">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number" value={newStore.storeId} onChange={e => setNewStore({ ...newStore, storeId: e.target.value })} />
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

export default Stores;
