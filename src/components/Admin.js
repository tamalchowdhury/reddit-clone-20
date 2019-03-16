import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    return (
      <div>
        <h2>Admin Page</h2>
        <h3>Top Banner Code</h3>
        <form action="">
          <textarea name="topBanner" className="banner-form" rows="5" />
          <hr />
        </form>
      </div>
    );
  }
}
