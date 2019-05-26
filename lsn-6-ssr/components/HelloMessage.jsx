import React from 'react';

const HelloMessage = ({ title }) => (
  <div className="container" style={{
    width: '600px',
    height: '100px',
    border: '1px solid black',
    margin: '0 auto',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  }}>
    <h1>{title}</h1>
  </div>
);

export default HelloMessage;
