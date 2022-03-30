import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useContacts, getContacts } from '../../context/contact/ContactState';

import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';

import Spinner from '../widgets/Spinner';

const Contacts = ({ formOffsetTop }) => {
  const [contactState, contactDispatch] = useContacts();

  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  return (
    <>
      <h4 className="mb-3">Contacts</h4>
      
      <div className="mb-4">
        {(contacts !== null) ? (
          <>
            {contacts.length > 0 && <ContactFilter />}

            {contacts.length === 0 && <div className="alert alert-info mb-4">There are no contacts found.</div>}
          
            <TransitionGroup>
              {filtered !== null ? (
                filtered.map(contact => (
                  <CSSTransition key={contact._id} timeout={250} classNames="item">
                    <ContactItem contact={contact} formOffsetTop={formOffsetTop} />
                  </CSSTransition>
                ))
              ) : (
                contacts.map(contact => (
                  <CSSTransition key={contact._id} timeout={250} classNames="item">
                    <ContactItem contact={contact} formOffsetTop={formOffsetTop} />
                  </CSSTransition>
                ))
              )}
            </TransitionGroup>
          </>
        ) : <Spinner />}
      </div>
    </>
  );
};

Contacts.propTypes = {
  formOffsetTop: PropTypes.number.isRequired
};

export default Contacts;