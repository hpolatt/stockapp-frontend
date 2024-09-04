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

    return (
        <div>
            <h1>Store Status</h1>
            <ul>
                {stores.map(store => (
                    // onClick={() => handleStoreClick(store)}
                    <li key={store.id} >
                        {store.name} - Last entry/exit: {store.lastEntryExitDate}
                    </li>
                ))}
            </ul>
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
