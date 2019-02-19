import React, { Component } from 'react';
import Post from './Post';

export default class UserPage extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    fetch(`/api/user/${this.props.match.params.username}/posts`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ posts: res.posts });
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    let { username } = this.props.match.params;
    return (
      <div>
        <h2>User page: {username}</h2>
        {this.state.posts.map((post, index) => (
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
      </div>
    );
  }
}
