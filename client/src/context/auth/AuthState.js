import React, { useEffect, useReducer } from 'react';

import axios from 'axios';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import setAuthToken from '../../utils/setAuthToken';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../types';

export const getUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  setAuthToken(state.token);

  if (state.loading) {
    getUser(dispatch);
  }

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);
 
  const login = async formData => {
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      getUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      getUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message
      });
    }
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  
  return (
    <AuthContext.Provider 
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        getUser,
        login,
        logout,
        register,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;