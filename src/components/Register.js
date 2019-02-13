import React, { Component } from 'react';

export default class Register extends Component {
  render() {
    return (
      <div>
        <div className="reg-form">
          <h4 className="modal-title">Create a new account</h4>
          <form action="">
            <input
              type="text"
              name="username"
              placeholder="choose a username"
            />
            <input type="password" name="password" placeholder="password" />
            <input
              type="password"
              name="password-confirm"
              placeholder="verify password"
            />
            <input type="email" name="email" placeholder="email" />
            <div className="register-button-box">
              <button className="button-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
