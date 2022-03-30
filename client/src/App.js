import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/widgets/Navbar';
import Alerts from './components/widgets/Alerts';

import Home from './components/pages/Home';
import About from './components/pages/About';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import PrivateRoute from './components/routes/PrivateRoute';

import ContactState from './context/contact/ContactState';

import AuthState from './context/auth/AuthState';

import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />

            <div className="container">
              <Alerts />
              
              <Routes>
                <Route path="/" element={<PrivateRoute component={Home} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>

            <div className="bg-light text-center mt-3 py-4">
              <div className="container">
                <p className="m-0 text-muted"><i className="fa fa-github"></i> <strong>Version: 1.0.0</strong> by <a href="https://github.com/kennyalmendral/w3contacts" className="text-decoration-none" target="_blank" rel="noreferrer">Kenny Almendral</a></p>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
