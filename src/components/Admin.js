import React, { Component } from 'react';

export default class Admin extends Component {
  state = {
    loading: ''
  };

  saveSettings = (event) => {
    event.preventDefault();
    let updates = {};
    updates.topBanner = event.target.topBanner.value;
    updates.footerBanner = event.target.footerBanner.value;
    updates.commentBanner = event.target.commentBanner.value;
    updates.sidebarBanner = event.target.sidebarBanner.value;
    updates.rulesCode = event.target.rulesCode.value;
    updates.extraCode = event.target.extraCode.value;

    this.setState({ loading: 'Saving...' });
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
      .then((json) => {
        if (json.success) {
          this.setState({ loading: undefined });
        }
      })
      .catch((err) => {
        this.setState({ loading: 'Failed to save!' });
      });
  };

  render() {
    let { codes } = this.props;
    return (
      <div>
        <h2>Admin Page</h2>
        <form onSubmit={this.saveSettings}>
          <h3>Top Banner Code</h3>
          <textarea
            name="topBanner"
            className="banner-form"
            rows="5"
            defaultValue={codes ? codes.topBanner : null}
          />
          <hr />
          <h3>Before Comments Banner Code</h3>
          <textarea
            name="commentBanner"
            className="banner-form"
            rows="5"
            defaultValue={codes ? codes.commentBanner : null}
          />
          <hr />
          <h2>Sidebar Area</h2>
          <h3>Sidebar Ad Code</h3>
          <textarea
            name="sidebarBanner"
            className="banner-form"
            rows="5"
            defaultValue={codes ? codes.sidebarBanner : null}
          />
          <hr />
          <h3>Rules Section HTML 1</h3>
          <textarea
            name="rulesCode"
            className="banner-form"
            rows="10"
            defaultValue={codes ? codes.rulesCode : null}
          />
          <hr />
          <h3>Extra Code HTML 2</h3>
          <textarea
            name="extraCode"
            className="banner-form"
            rows="10"
            defaultValue={codes ? codes.extraCode : null}
          />
          <hr />
          <h2>Footer Section</h2>
          <h3>Footer Banner Code</h3>
          <textarea
            name="footerBanner"
            className="banner-form"
            rows="5"
            defaultValue={codes ? codes.footerBanner : null}
          />
          <hr />
          <strong>Save all changes</strong>
          <br />
          <button>Save</button> {this.state.loading}
        </form>
      </div>
    );
  }
}
