import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        {this.props.posts.map((post, index) => (
          <Post key={index} post={post} rank={index + 1} />
        ))}
        <div className="pagination">View more: next ></div>
      </div>
    );
  }
}
