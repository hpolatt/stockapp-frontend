// 
import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StoreStatus from './components/StoreStatus';
import EntryExitForms from './components/EntryExitForms';
import Settings from './components/Settings';
import './css/App.css';

const Home = () => {

  return (
   <div className="App">
      <Sidebar />
      <h1>wellcome to hpolat stock app</h1>
    </div>

  );
};

export default Home;