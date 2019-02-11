import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Link to="/submit">Submit</Link>
        <Post />
        <Post />
        <Post />
        <div className="pagination">View more: next ></div>
      </div>
    );
  }
}
