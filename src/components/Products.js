import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllRecords, addRecord } from '../api/Services.js';
import '../css/List.css'; 

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        sku: '',
        barcode: '',
        category: '',
        brand: '',
        quantity: 0,
        images: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        
        getAllRecords("settings/products")
            .then(data => setProducts(data));
    }, []);

    const handleProductSubmit = (e) => {
        e.preventDefault();
        addRecord("settings/products", newProduct)
            .then(data => setProducts([...products, data]));
        
        setNewProduct({
            name: '',
            description: '',
            sku: '',
            barcode: '',
            category: '',
            brand: '',
            quantity: 0,
            images: ''
        });
        setShowForm(false);
    };

    return (
        <div>
            <h2>Products</h2>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Name</div>
                    <div className="forms-cell">Description</div>
                    <div className="forms-cell">SKU</div>
                    <div className="forms-cell">Barcode</div>
                    <div className="forms-cell">Category</div>
                    <div className="forms-cell">Brand</div>
                    <div className="forms-cell">Quantity</div>
                    <div className="forms-cell">Images</div>
                </div>
                {products.map(product => (
                    <div className="forms-row" key={product.id}>
                        <div className="forms-cell">{product.name}</div>
                        <div className="forms-cell">{product.description}</div>
                        <div className="forms-cell">{product.sku}</div>
                        <div className="forms-cell">{product.barcode}</div>
                        <div className="forms-cell">{product.category}</div>
                        <div className="forms-cell">{product.brand}</div>
                        <div className="forms-cell">{product.quantity}</div>
                        <div className="forms-cell">{product.images}</div>
                    </div>
                ))}
            </div>

            <Button variant="primary" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: '40px', right: '40px' }}>+</Button>

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleProductSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSku">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control type="text" value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBarcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control type="text" value={newProduct.barcode} onChange={e => setNewProduct({ ...newProduct, barcode: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={newProduct.quantity} onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="text" value={newProduct.images} onChange={e => setNewProduct({ ...newProduct, images: e.target.value })} />
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

export default Products;
