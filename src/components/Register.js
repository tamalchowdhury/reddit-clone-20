import React, { Component } from 'react';

export default class Register extends Component {
  state = {
    regError: false,
    regErrorMsg: ''
  };

  displayError = (message) => {
    this.setState({
      regError: true,
      regErrorMsg: message
    });
  };

  registerAccount = (event) => {
    event.preventDefault();
    let user = {};
    user.username = event.target.username.value.toLowerCase();
    user.password = event.target.password.value;
    user.passwordConfirm = event.target.passwordConfirm.value;
    user.email = event.target.email.value;

    // TODO Validate here
    if (user.username && user.password) {
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Registered successfully
            this.props.register(res);
            this.props.history.push('/');
          } else {
            this.displayError(res.message);
          }
        })
        .catch((err) => {
          // Catch the error
          this.displayError('There was a problem connecting to the server');
          console.log(err);
        });
    } else {
      // Display an error
      this.displayError('Required fields are missing');
    }
  };
  render() {
    document.title = 'Sign up';
    return (
      <div>
        <div className="reg-form">
          <h4 className="modal-title">Create a new account</h4>
          {this.state.regError ? (
            <div className="reg-error">
              {this.state.regErrorMsg}
              <div
                className="close-button"
                onClick={() => {
                  this.setState({ regError: false });
                }}>
                &times;
              </div>
            </div>
          ) : (
            ''
          )}

          <form onSubmit={this.registerAccount}>
            <input
              type="text"
              name="username"
              placeholder="choose a username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="verify password"
              required
            />
            <input type="email" name="email" placeholder="email" required />
            <div className="register-button-box">
              <button className="button-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
