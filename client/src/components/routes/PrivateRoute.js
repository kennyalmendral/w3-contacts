import React from 'react';

import { Navigate } from 'react-router-dom';

import Spinner from '../widgets/Spinner';

import { useAuth } from '../../context/auth/AuthState';

const PrivateRoute = ({ component: Component }) => {
  const [authState] = useAuth();
  
  const { isAuthenticated, loading } = authState;

  if (loading) return <Spinner />;

  if (isAuthenticated) return <Component />;

  return <Navigate to='/login' />;
};

export default PrivateRoute;