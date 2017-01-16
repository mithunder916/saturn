import React, { Component } from 'react';

/* The 'App' contains everything. Any component you add here will always be
visible. Could be a good place for the Navbar if you want to add one. */

const App = props => {
  const { children } = props;

  return (
    <div>
      { children }
    </div>
  )
}

export default App;
