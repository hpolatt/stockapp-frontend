/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import logo from '../logo-black.svg'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img src={logo} className="logo"/>
            <ul>
                <li><Link to="/store-status">Store Status</Link></li>
                <li><Link to="/entry-exit-forms">Entry/Exit Forms</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;