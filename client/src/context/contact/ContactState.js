import React, { useReducer, useContext } from 'react';

import axios from 'axios';

import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER
} from '../types';

export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  return [state, dispatch];
};

export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.message
    });
  }
};

export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.message
    });
  }
};

export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.message
    });
  }
};

export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.message
    });
  }
};

export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

export const setCurrent = (dispatch, contact) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact
  });
};

export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

export const filterContacts = (dispatch, term) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: term
  });
};

export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);
  
  return (
    <ContactContext.Provider 
      value={{
        state: state,
        dispatch
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;