import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StoreStatus from './components/StoreStatus';
import EntryExitForms from './components/EntryExitForms';
import Settings from './components/Settings';
import './css/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Switch>
                        <Route path="/store-status" component={StoreStatus} />
                        <Route path="/entry-exit-forms" component={EntryExitForms} />
                        <Route path="/settings" component={Settings} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
