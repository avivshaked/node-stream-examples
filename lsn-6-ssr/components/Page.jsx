import React from 'react';

const Page = ({children}) => (
    <div className="page" style={{
        width: '100vw',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
    }}>
      {children}
    </div>
);

export default Page;
