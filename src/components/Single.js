import React, { Component } from 'react';
import Post from './Post';

export default class Single extends Component {
  render() {
    let post = this.props.getTheSinglePost(this.props.match.params.id);

    if (!post) {
      return (
        <div>
          <h3>Loading</h3>
        </div>
      );
    }

    let { title, text, created, votes } = post;

    return (
      <div>
        <Post
          key={1}
          user={this.props.user}
          updateUser={this.props.updateUser}
          post={post}
          rank={1}
          single={true}
        />
      </div>
    );
  }
}
