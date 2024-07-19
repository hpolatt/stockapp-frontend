import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: 0 });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Ürünleri fetch ile alın
        fetch("/api/settings/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleProductSubmit = (e) => {
        e.preventDefault();
        // Yeni ürünü API ile gönder
        fetch("/api/settings/products", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        }).then(response => response.json())
            .then(data => setProducts([...products, data]));

        setNewProduct({ name: '', sku: '', quantity: 0 });
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - {product.sku} - {product.quantity}</li>
                ))}
            </ul>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleProductSubmit}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" value={newProduct.date} onChange={e => setNewProduct({ ...newProduct, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProductId">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number" value={newProduct.productId} onChange={e => setNewProduct({ ...newProduct, productId: e.target.value })} />
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

export default Products;
