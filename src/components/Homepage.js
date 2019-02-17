import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../img/loading.gif';
import Post from './Post';

export default class Homepage extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="center">
          <img src={Loading} alt="Loading animation" />
        </div>
      );
    }

    return (
      <div>
        {this.props.posts.map((post, index) => (
          <Post
            key={index}
            user={this.props.user}
            token={this.props.token}
            updateUser={this.props.updateUser}
            deletePost={this.props.deletePost}
            post={post}
            rank={index + 1}
          />
        ))}
        <div className="pagination">View more: next ></div>
      </div>
    );
  }
}
