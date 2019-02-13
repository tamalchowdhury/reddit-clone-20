import React, { Component } from 'react';

export default class Register extends Component {
  registerAccount = (event) => {
    event.preventDefault();
    let user = {};
    user.username = event.target.username.value;
    user.password = event.target.password.value;
    user.passwordConfirm = event.target.passwordConfirm.value;
    user.email = event.target.email.value;

    // TODO Validate here
    if (user.username && user.password) {
      this.props.register(user);
    } else {
      // Display an error
    }
  };
  render() {
    return (
      <div>
        <div className="reg-form">
          <h4 className="modal-title">Create a new account</h4>
          <form onSubmit={this.registerAccount}>
            <input
              type="text"
              name="username"
              placeholder="choose a username"
            />
            <input type="password" name="password" placeholder="password" />
            <input
              type="password"
              name="passwordConfirm"
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
