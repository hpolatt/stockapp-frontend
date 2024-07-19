import React, { useState, useEffect } from 'react';

const StoreStatus = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        // Depoları fetch ile alın
        fetch("/api/stores")
            .then(response => response.json())
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
                    <li key={store.id} onClick={() => handleStoreClick(store)}>
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
