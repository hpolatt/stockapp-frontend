import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', sku: '', quantity: 0 });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Ürünleri fetch ile alın
        fetch("/api/settings/categories")
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        // Yeni ürünü API ile gönder
        fetch("/api/settings/categories", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory)
        }).then(response => response.json())
          .then(data => setCategories([...categories, data]));

        setNewCategory({ name: '', sku: '', quantity: 0 });
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name} - {category.sku} - {category.quantity}</li>
                ))}
            </ul>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCategorySubmit}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newCategory.type} onChange={e => setNewCategory({ ...newCategory, type: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" value={newCategory.date} onChange={e => setNewCategory({ ...newCategory, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryId">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number" value={newCategory.categoryId} onChange={e => setNewCategory({ ...newCategory, categoryId: e.target.value })} />
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

export default Categories;
