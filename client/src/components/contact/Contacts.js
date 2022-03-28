import React, { useEffect, useContext } from 'react';

import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/ContactContext';

import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';

import Spinner from '../widgets/Spinner';

const Contacts = ({ formOffsetTop }) => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h4 className="mb-3">Contacts</h4>

      {contacts === null && <div className="alert alert-info mb-4">There are no contacts found.</div>}
      
      {contacts !== null && (
        <>
          <ContactFilter />

          <div className="mb-4">
            {(contacts !== null && !loading) ? (
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
            ) : <Spinner />}
          </div>
        </>
      )}
    </>
  );
};

Contacts.propTypes = {
  formOffsetTop: PropTypes.number.isRequired
};

export default Contacts;