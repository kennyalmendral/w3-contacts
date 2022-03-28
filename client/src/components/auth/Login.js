import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';

import AlertContext from '../../context/alert/AlertContext';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');

      clearErrors();
    }
  }, [navigate, error, isAuthenticated, setAlert, clearErrors]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('All fields are required.', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0 text-secondary">Login to your account</h5>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>

            <input 
              type="email" 
              name="email" 
              id="email" 
              className="form-control" 
              value={email} 
              onChange={onChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>

            <input 
              type="password" 
              name="password" 
              id="password" 
              className="form-control" 
              value={password} 
              onChange={onChange} 
              required 
            />
          </div>
        </div>

        <div className="card-footer">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </div>
    </form>
  )
};

export default Login;