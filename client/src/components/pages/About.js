import React from 'react';

const About = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0 text-secondary">About W3Contacts</h5>
      </div>

      <div className="card-body">
        <p className="mb-0">Manage your contacts on the web with ease.</p>
      </div>

      <div className="card-footer">
        <p className="m-0 text-muted"><i className="fa fa-github"></i> <strong>Version: 1.0.0</strong> by <a href="https://github.com/kennyalmendral/w3contacts" className="text-decoration-none" target="_blank" rel="noreferrer">Kenny Almendral</a></p>
      </div>
    </div>
  );
};

export default About;