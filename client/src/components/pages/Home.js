import React, { useState, useEffect, useContext } from 'react';

import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';

import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const [formOffsetTop, setFormOffsetTop] = useState(0);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-lg-7">
        <Contacts formOffsetTop={formOffsetTop} />
      </div>

      <div className="col-lg-5 mb-4">
        <ContactForm setFormOffsetTop={setFormOffsetTop} />
      </div>
    </div>
  );
};

export default Home;