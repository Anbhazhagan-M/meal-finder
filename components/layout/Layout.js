/* eslint-disable linebreak-style */
import React from 'react';
import classes from './Layout.module.scss';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (

    <div className={classes.container}>
      <Navbar />
      {children}
      <Footer />
    </div>

  );
}

export default Layout;
