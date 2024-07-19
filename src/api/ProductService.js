import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    // Authorization: 'Basic ' + btoa('admin:admin')

};
export const getAllProducts = async () => {
    return await fetch(API_URL, {headers})
        .then(response => response.json());
};

export const getProductById = async (id) => {
    return await fetch(`${API_URL}/${id}`, {headers})
        .then(response => response.json());
};

export const addProduct = async (product) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(product),
    })
        .then(response => response.json());
};

export const updateProduct = async (id, product) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(product),
    })
        .then(response => response.json());
};

export const deleteProduct = async (id) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    }).then(response => response.json());
};
