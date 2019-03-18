import React, { Component } from 'react';

export default class Admin extends Component {
  saveSettings = (event) => {
    event.preventDefault();
    let updates = {};
    updates.topBanner = event.target.topBanner.value;
    updates.footerBanner = event.target.footerBanner.value;
    updates.commentBanner = event.target.commentBanner.value;
    updates.sidebarBanner = event.target.sidebarBanner.value;
    updates.rulesCode = event.target.rulesCode.value;
    updates.extraCode = event.target.extraCode.value;

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
    let {
      topBanner,
      footerBanner,
      commentBanner,
      sidebarBanner,
      rulesCode,
      extraCode
    } = this.props.codes;
    return (
      <div>
        <h2>Admin Page</h2>
        <form onSubmit={this.saveSettings}>
          <h3>Top Banner Code</h3>
          <textarea
            name="topBanner"
            className="banner-form"
            rows="5"
            defaultValue={topBanner}
          />
          <hr />
          <h3>Before Comments Banner Code</h3>
          <textarea
            name="commentBanner"
            className="banner-form"
            rows="5"
            defaultValue={commentBanner}
          />
          <hr />
          <h2>Sidebar Area</h2>
          <h3>Sidebar Ad Code</h3>
          <textarea
            name="sidebarBanner"
            className="banner-form"
            rows="5"
            defaultValue={sidebarBanner}
          />
          <hr />
          <h3>Rules Section HTML 1</h3>
          <textarea
            name="rulesCode"
            className="banner-form"
            rows="10"
            defaultValue={rulesCode}
          />
          <hr />
          <h3>Extra Code HTML 2</h3>
          <textarea
            name="extraCode"
            className="banner-form"
            rows="10"
            defaultValue={extraCode}
          />
          <hr />
          <h2>Footer Section</h2>
          <h3>Footer Banner Code</h3>
          <textarea
            name="footerBanner"
            className="banner-form"
            rows="5"
            defaultValue={footerBanner}
          />
          <hr />
          <strong>Save all changes</strong>
          <br />
          <button>Save</button>
        </form>
      </div>
    );
  }
}
