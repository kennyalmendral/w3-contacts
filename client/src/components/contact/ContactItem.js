import React from 'react';

import PropTypes from 'prop-types';

import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent
} from '../../context/contact/ContactState';

const ContactItem = ({ contact, formOffsetTop }) => {
  const contactDispatch = useContacts()[1];

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    const confirmation = window.confirm('Are you sure?');

    if (confirmation) {
      deleteContact(contactDispatch, _id);

      clearCurrent(contactDispatch);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h3 className="h6 mb-0 text-secondary text-left d-flex justify-content-between align-items-center">
            <strong>{name}</strong>
            {' '}
            <span className={`badge ${type === 'professional' ? 'bg-info' : 'bg-warning'}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </h3>
        </div>

        <div className="card-body">
          <ul className="list list-unstyled mb-0">
            {email && <li><a href={`mailto:${email}`} className="text-decoration-none"><small className="pe-1"><i className="fa fa-envelope"></i></small> {email}</a></li>}

            {phone && <li><a href={`tel:${phone}`} className="text-decoration-none"><small className="pe-1"><i className="fa fa-phone"></i></small> {phone}</a></li>}
          </ul>
        </div>

        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-sm btn-primary me-2" onClick={() => {
            setCurrent(contactDispatch, contact);

            window.scrollTo({
              top: formOffsetTop,
              behavior: 'smooth'
            });
          }}><i className="fa fa-pencil"></i></button>
          
          <button className="btn btn-sm btn-danger" onClick={onDelete}><i className="fa fa-trash"></i></button>
        </div>
      </div>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  formOffsetTop: PropTypes.number.isRequired
};

export default ContactItem;