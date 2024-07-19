import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState({ name: '', sku: '', quantity: 0 });
    const [showForm, setShowForm] = useState(false);
    
    useEffect(() => {
        // Ürünleri fetch ile alın
        fetch("/api/settings/brands")
            .then(response => response.json())
            .then(data => setBrands(data));
    }, []);

    const handleBrandSubmit = (e) => {
        e.preventDefault();
        // Yeni ürünü API ile gönder
        fetch("/api/settings/brands", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBrand)
        }).then(response => response.json())
            .then(data => setBrands([...brands, data]));

        setNewBrand({ name: '', sku: '', quantity: 0 });
    };

    return (
        <div>
            <h2>Brands</h2>
            <ul>
                {brands.map(brand => (
                    <li key={brand.id}>{brand.name} - {brand.sku} - {brand.quantity}</li>
                ))}
            </ul>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleBrandSubmit}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newBrand.type} onChange={e => setNewBrand({ ...newBrand, type: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" value={newBrand.date} onChange={e => setNewBrand({ ...newBrand, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBrandId">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number" value={newBrand.brandId} onChange={e => setNewBrand({ ...newBrand, brandId: e.target.value })} />
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

export default Brands;
