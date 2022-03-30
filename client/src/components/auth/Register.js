import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import AlertContext from '../../context/alert/AlertContext';

import { useAuth, clearErrors, register } from '../../context/auth/AuthState';

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const { name, email, password, password_confirmation } = user;

  const [authState, authDispatch] = useAuth();

  const { error, isAuthenticated } = authState;

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/');
  }

  useEffect(() => {
    if (error === 'User already exists.') {
      setAlert(error, 'danger');

      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('All fields are required.', 'danger');
    } else if (password !== password_confirmation) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      register(authDispatch, {
        name,
        email,
        password
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create an account | W3Contacts</title>
      </Helmet>

      <form onSubmit={onSubmit} className="auth-form">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-secondary">Create an account</h5>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>

              <input 
                type="text" 
                name="name" 
                id="name" 
                className="form-control" 
                value={name} 
                onChange={onChange} 
                required 
              />
            </div>

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
                minLength="6" 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password-confirmation" className="form-label">Password confirmation</label>

              <input 
                type="password" 
                name="password_confirmation" 
                id="password-confirmation" 
                className="form-control" 
                value={password_confirmation} 
                onChange={onChange} 
                minLength="6" 
                required 
              />
            </div>
          </div>

          <div className="card-footer">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </>
  )
};

export default Register;