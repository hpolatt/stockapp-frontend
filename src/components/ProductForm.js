import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getProductById, addProduct, updateProduct } from '../api/ProductService';
import './ProductForm.css';

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', sku: '', barcode: '', category: '', brand: '', quantity: 0, images: [] });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        const result = await getProductById(id);
        setProduct(result.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateProduct(id, product);
        } else {
            await addProduct(product);
        }
        handleCancel();
    };

    const handleCancel = () => {
        history.push('/');
    };

    return (
        <div className="form-container">
            <div className="header">
                <button onClick={handleCancel} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
                <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
                <label>Name</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} />
                <label>Description</label>
                <input type="text" name="description" value={product.description} onChange={handleChange} />
                <label>SKU</label>
                <input type="text" name="sku" value={product.sku} onChange={handleChange} />
                <label>Barcode</label>
                <input type="text" name="barcode" value={product.barcode} onChange={handleChange} />
                <label>Category</label>
                <input type="text" name="category" value={product.category} onChange={handleChange} />
                <label>Brand</label>
                <input type="text" name="brand" value={product.brand} onChange={handleChange} />
                <label>Quantity</label>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                <button type="submit" className="submit-button">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default ProductForm;
