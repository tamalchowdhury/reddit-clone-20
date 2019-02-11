import React, { Component, Fragment } from 'react';
import Post from './Post';

export default class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <Post />
        <Post />
        <Post />
        <div className="pagination">View more: next ></div>
      </Fragment>
    );
  }
}
