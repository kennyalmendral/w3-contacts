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

import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
