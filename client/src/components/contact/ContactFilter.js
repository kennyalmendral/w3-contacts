import React from 'react';

import {
  useContacts,
  filterContacts,
  clearFilter
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const contactDispatch = useContacts()[1];

  const onChange = e => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form className="mb-4" onSubmit={e => e.preventDefault()}>
      <input 
        type="text" 
        placeholder="Filter contacts by name, email address, phone number or type" 
        className="form-control" 
        onChange={onChange} 
      />
    </form>
  );
};

export default ContactFilter;