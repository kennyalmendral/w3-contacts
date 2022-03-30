import React, { useEffect, useReducer, useContext } from 'react';

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

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  return [state, dispatch];
};

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

export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    getUser(dispatch);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message
    });
  }
};

export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    getUser(dispatch);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    });
  }
};

export const logout = (dispatch) => dispatch({ type: LOGOUT });

export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

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
  
  return (
    <AuthContext.Provider 
      value={{
        state: state,
        dispatch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;