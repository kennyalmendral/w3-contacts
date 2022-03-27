import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/ContactContext';

import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';

const Contacts = ({ formOffsetTop }) => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  return (
    <>
      <h4 className="mb-3">Contacts</h4>

      {contacts.length === 0 && <div className="alert alert-info mb-4">There are no contacts found.</div>}
      
      {contacts.length > 0 && (
        <>
          <ContactFilter />

          <div className="mb-4">
            <TransitionGroup>
              {filtered !== null ? (
                filtered.map(contact => (
                  <CSSTransition key={contact.id} timeout={250} classNames="item">
                    <ContactItem contact={contact} formOffsetTop={formOffsetTop} />
                  </CSSTransition>
                ))
              ) : (
                contacts.map(contact => (
                  <CSSTransition key={contact.id} timeout={250} classNames="item">
                    <ContactItem contact={contact} formOffsetTop={formOffsetTop} />
                  </CSSTransition>
                ))
              )}
            </TransitionGroup>
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