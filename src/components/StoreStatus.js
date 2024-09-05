import React, { useState, useEffect } from 'react';
import { getAllRecords } from '../api/Services.js';
import '../css/List.css';

const StoreStatus = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        getAllRecords("stores")
            .then(data => setStores(data));
    }, []);

    const handleStoreClick = (store) => {
        setSelectedStore(store);
        // İlgili deponun ürünlerini fetch ile alın
    };

    console.log(stores);
    return (
        <div>
            <h1>Store Status</h1>
            <div className="forms-container">
                <div className="forms-header">
                    <div className="forms-cell">Name</div>
                    <div className="forms-cell">Description</div>
                    <div className="forms-cell">Notes</div>
                </div>

                {stores.map(store => (
                    // onClick={() => handleStoreClick(store)}
                    <div className="forms-row" key={store.id}>
                        <div className="forms-cell">{store.name}</div>
                        <div className="forms-cell">{store.description}</div>
                        <div className="forms-cell">{store.notes}</div>
                    </div>
                ))}
            </div>
            {selectedStore && (
                <div>
                    <h2>{selectedStore.name} Products</h2>
                    <ul>
                        {selectedStore.products.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StoreStatus;
