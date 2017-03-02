import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.signInGoog = this.signInGoog.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signInGoog() {
    const { firebase } = this.props
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
  }

  signOut() {
    const { firebase } = this.props
    firebase.auth().signOut()
  }

  render() {
    return (
    <div>
      <button onClick={() => this.signInGoog()}>LOGIN</button>
    </div>
    )
  }
}
/* REDUX CONTAINER */
const mapStateToProps = ({ firebase }) => ({ firebase })

// const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps)(Login);
