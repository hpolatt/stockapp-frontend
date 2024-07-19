import React, { useEffect, useState } from 'react';
import Products from './Products';
import Brands from './Brands';
import Categories from './Categories';
import Stores from './Stores';
import '../css/Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('products');
    useEffect(() => {
        console.log('Settings component is mounted', activeTab);
    }, []);
    return (
        <div>
            <h1>Settings</h1>
            <div className="tabs">
                <button className={activeTab === 'products' ? 'active' : ''}onClick={() => setActiveTab('products')}>Products</button>
                <button className={activeTab === 'brands' ? 'active' : ''} onClick={() => setActiveTab('brands')}>Brands</button>
                <button className={activeTab === 'categories' ? 'active' : ''}onClick={() => setActiveTab('categories')}>Categories</button>
                <button className={activeTab === 'stores' ? 'active' : ''}onClick={() => setActiveTab('stores')}>Stores</button>
            </div>
            <div className="tab-content">
                {activeTab === 'products' && <Products />}
                {activeTab === 'brands' && <Brands />}
                {activeTab === 'categories' && <Categories />}
                {activeTab === 'stores' && <Stores />}
            </div>
        </div>
    );
};

export default Settings;
