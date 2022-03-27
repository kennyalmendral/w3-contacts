import React, { useContext, useEffect, useRef } from 'react';

import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter, filtered } = contactContext;

  const inputEl = useRef(null);

  useEffect(() => {
    if (filtered === null) {
      inputEl.current.value = null;
    }
  }, [filtered]);

  const onChange = e => {
    if (inputEl.current.value !== null) {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className="mb-4">
      <input 
        ref={inputEl} 
        type="text" 
        placeholder="Filter contacts by name, email address, phone number or type" 
        className="form-control" 
        onChange={onChange} 
      />
    </form>
  );
};

export default ContactFilter;