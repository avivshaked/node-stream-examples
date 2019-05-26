// @flow

import React from 'react';
import Page from './Page.jsx'
import NavBar from "./NavBar.jsx";
import HelloMessage from './HelloMessage.jsx';

export default ({ title }) => (
  <Page>
    <NavBar />
    <HelloMessage title={title}/>
  </Page>
)
