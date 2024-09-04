import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllRecords, addRecord } from '../api/Services.js';
import '../css/List.css'; 

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch categories
        getAllRecords("settings/categories")
            .then(data => setCategories(data));
    }, []);

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        addRecord("settings/categories", newCategory)
            .then(data => setCategories([...categories, data]));

        setNewCategory({ name: '', description: '' });
        setShowForm(false);
    };

    return (
        <div>
            <h2>Categories</h2>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Name</div>
                    <div className="forms-cell">Description</div>
                </div>
                {categories.map(product => (
                    <div className="forms-row" key={product.id}>
                        <div className="forms-cell">{product.name}</div>
                        <div className="forms-cell">{product.description}</div>
                    </div>
                ))}
            </div>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCategorySubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
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

export default Categories;
