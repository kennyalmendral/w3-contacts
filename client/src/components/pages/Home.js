import React, { useState } from 'react';

import { Helmet } from 'react-helmet';

import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';

const Home = () => {
  const [formOffsetTop, setFormOffsetTop] = useState(0);

  return (
    <>
      <Helmet>
        <title>W3Contacts | Manage your contacts on the web with ease</title>
      </Helmet>

      <div className="row">
        <div className="col-lg-7">
          <Contacts formOffsetTop={formOffsetTop} />
        </div>

        <div className="col-lg-5 mb-4">
          <ContactForm setFormOffsetTop={setFormOffsetTop} />
        </div>
      </div>
    </>
  );
};

export default Home;