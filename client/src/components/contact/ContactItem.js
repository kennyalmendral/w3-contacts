import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact, formOffsetTop }) => {
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    const confirmation = window.confirm('Are you sure?');

    if (confirmation) {
      deleteContact(id);

      clearCurrent();
    }
  };

  return (
    <>
      <div className="card shadow-sm mb-3">
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
            setCurrent(contact);

            window.scrollTo({
              top: formOffsetTop,
              behavior: 'smooth'
            });
          }}><i className="fa fa-pencil"></i> Edit</button>
          
          <button className="btn btn-sm btn-danger" onClick={onDelete}><i className="fa fa-trash"></i> Delete</button>
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