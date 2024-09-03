import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './Home';
import StoreStatus from './components/StoreStatus';
import EntryExitForms from './components/EntryExitForms';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';

const page = (Component) => {
    return (
        <div className="App">
            <Sidebar />
            <Component />
        </div>
    );
};

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/login'); // Token yoksa login sayfasına yönlendir
        }
    }, [navigate]);

    return children;
};

const App = () => {
    const handleLogin = async (email, password) => {
        try {
            // Backend'e istek gönderip JWT token'ı alıyoruz
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.token;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Login failed', err);
            return null;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/home" element={<RequireAuth>{page(Home)}</RequireAuth>} />
                <Route path="/store-status" element={<RequireAuth>{page(StoreStatus)}</RequireAuth>} />
                <Route path="/entry-exit-forms" element={<RequireAuth>{page(EntryExitForms)}</RequireAuth>} />
                <Route path="/settings" element={<RequireAuth>{page(Settings)}</RequireAuth>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
