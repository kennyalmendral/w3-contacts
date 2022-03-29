import React, { useContext, useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import ContactContext from '../../context/contact/ContactContext';

const ContactForm = ({ setFormOffsetTop }) => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const formEl = useRef(null);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      resetForm();
    }
  }, [current]);

  useEffect(() => {
    setFormOffsetTop(formEl.current.offsetTop);
  }, [formEl, setFormOffsetTop]);

  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearCurrent();

    resetForm();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const resetForm = () => {
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  return (
    <>
      <form ref={formEl} onSubmit={onSubmit}>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-secondary">{current ? 'Edit' : 'Add'} contact</h5>
          </div>

          <div className="card-body pb-2">
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">Name</label>

                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  id="name" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={onChange} 
                  required 
                />
              </div>

              <div className="col-lg-6 mb-3">
                <label htmlFor="email" className="form-label">Email address</label>

                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  id="email" 
                  placeholder="johndoe@gmail.com" 
                  value={email} 
                  onChange={onChange} 
                  required 
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="phone" className="form-label">Phone number</label>

                <input 
                  type="text" 
                  className="form-control" 
                  name="phone" 
                  id="phone" 
                  placeholder="123 456 7891" 
                  value={phone} 
                  onChange={onChange} 
                  required 
                />
              </div>

              <div className="col-lg-6 mb-3 type-container">
                <label htmlFor="personal" className="form-label">Type</label>

                <div className="d-flex">
                  <div className="form-check me-3">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      name="type" 
                      id="personal" 
                      value="personal" 
                      checked={type === 'personal'} 
                      onChange={onChange} 
                    />

                    <label htmlFor="personal" className="form-check-label">Personal</label>
                  </div>

                  <div className="form-check">
                    <input 
                      type="radio" 
                      className="form-check-input" 
                      name="type" 
                      id="professional" 
                      value="professional" 
                      checked={type === 'professional'} 
                      onChange={onChange} 
                    />

                    <label htmlFor="professional" className="form-check-label">Professional</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex align-items-center">
            <input 
              type="submit" 
              className="btn btn-primary me-2" 
              value={current ? 'Save changes' : 'Submit'} 
            />

            {current && (
              <button 
                type="button"
                className="btn btn-secondary btn-block" 
                onClick={resetForm}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  setFormOffsetTop: PropTypes.func.isRequired
};

export default ContactForm;