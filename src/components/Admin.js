import React, { Component } from 'react';

export default class Admin extends Component {
  saveSettings = (event) => {
    event.preventDefault();
    let updates = {};
    let { topBanner } = event.target;
    updates.topBanner = topBanner.value;

    fetch(`/api/app/update`, {
      method: 'PUT',
      headers: {
        // TODO
        // Setup token in this stage
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Admin Page</h2>
        <h3>Top Banner Code</h3>
        <form onSubmit={this.saveSettings}>
          <textarea name="topBanner" className="banner-form" rows="5" />
          <hr />
          <strong>Save all changes</strong>
          <br />
          <button>Save</button>
        </form>
      </div>
    );
  }
}
