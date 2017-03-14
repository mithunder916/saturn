import React, { Component } from 'react';
import Login from './Login';

export default class Navbar extends Component {
  render(){
    return (
      <div id='navbar'>
        <div id='logoContainer'>
          <object
            type="image/svg+xml"
            data="public/style/svgs/saturn2.svg" />
          <p>Saturn</p>
        </div>
        <Login />
      </div>
    )
  }
}
