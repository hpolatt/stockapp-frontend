import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllRecords, addRecord } from '../api/Services.js';
import '../css/List.css';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState({
        name: '',
        description: '',
        email: '',
        address: '',
        phone: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getAllRecords("settings/brands")
            .then(data => setBrands(data));
            
    }, []);

    const handleBrandSubmit = (e) => {
        e.preventDefault();
        addRecord("settings/brands", newBrand).then(data => setBrands([...brands, data])); 

        setNewBrand({
            name: '',
            description: '',
            email: '',
            address: '',
            phone: ''
        });
        setShowForm(false);
    };

    return (
        <div>
            <h2>Brands</h2>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Name</div>
                    <div className="forms-cell">Description</div>
                    <div className="forms-cell">Email</div>
                    <div className="forms-cell">Address</div>
                    <div className="forms-cell">Phone</div>
                </div>
                {brands.map(brand => (
                    <div className="forms-row" key={brand.id}>
                        <div className="forms-cell">{brand.name}</div>
                        <div className="forms-cell">{brand.description}</div>
                        <div className="forms-cell">{brand.email}</div>
                        <div className="forms-cell">{brand.address}</div>
                        <div className="forms-cell">{brand.phone}</div>
                    </div>
                ))}
            </div>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleBrandSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newBrand.name} onChange={e => setNewBrand({ ...newBrand, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newBrand.description} onChange={e => setNewBrand({ ...newBrand, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={newBrand.email} onChange={e => setNewBrand({ ...newBrand, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={newBrand.address} onChange={e => setNewBrand({ ...newBrand, address: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={newBrand.phone} onChange={e => setNewBrand({ ...newBrand, phone: e.target.value })} />
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

export default Brands;
