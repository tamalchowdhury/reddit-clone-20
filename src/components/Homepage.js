import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../img/loading.gif';
import Post from './Post';

export default class Homepage extends Component {
  loadMorePosts = () => {
    this.props.getNextPosts(5);
  };

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
        {this.props.loadMore ? (
          <div className="pagination center">
            <span onClick={this.loadMorePosts} className="load-more">
              Load more
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
