import React, { Component } from 'react';
import Post from './Post';

export default class UserPage extends Component {
  state = {
    posts: [],
    currentUser: {}
  };

  adminAction = (type) => {
    if (this.props.user._id) {
      fetch(`/api/user/${this.props.match.params.username}/action/${type}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: this.props.user._id })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Action commited successfully
            this.setState({ currentUser: res.currentUser });
          } else {
            // Something went wrong
            console.log('Something went wrong');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };

  deleteUser = () => {
    if (this.props.user._id) {
      if (
        window.confirm(
          'Are you sure you want to delete this user and all the posts created by them?'
        )
      ) {
        fetch(`/api/user/${this.props.match.params.username}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: this.props.user._id })
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              // Deleted successfully
              this.props.history.push(`/`);
              console.log(res);
            } else {
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log('You are not logged in!');
    }
  };

  userPageUpdate = (updatedPost) => {
    // Update the user posts
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id === updatedPost._id) posts[index] = updatedPost;
    });
    this.setState({ posts });
  };

  userPageDelete = (deletedId) => {
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id === deletedId) posts.splice(index, 1);
    });
    this.setState({ posts });
  };

  componentDidMount() {
    fetch(`/api/user/${this.props.match.params.username}/posts`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ posts: res.posts, currentUser: res.currentUser });
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    let { username } = this.props.match.params;
    let { isAdmin, banned } = this.state.currentUser;
    document.title = `User page: ${username}`;
    return (
      <div>
        <div className="user-area">
          <h2>{username}</h2>
          {this.props.user.isAdmin &&
          this.state.currentUser &&
          this.props.user._id !== this.state.currentUser._id ? (
            <div className="admin-actions">
              Admin actions:{' '}
              {banned ? (
                <button
                  className="load-more"
                  onClick={() => this.adminAction('unban')}>
                  Unban User
                </button>
              ) : (
                <button
                  className="load-more red"
                  onClick={() => this.adminAction('ban')}>
                  Ban User
                </button>
              )}{' '}
              {isAdmin ? (
                <button
                  className="load-more"
                  onClick={() => this.adminAction('removeadmin')}>
                  Remove Admin
                </button>
              ) : (
                <button
                  className="load-more"
                  onClick={() => this.adminAction('makeadmin')}>
                  Make Admin
                </button>
              )}{' '}
              <button className="load-more red" onClick={this.deleteUser}>
                Delete User
              </button>{' '}
            </div>
          ) : (
            ''
          )}
        </div>

        {this.state.posts.map((post, index) => (
          <Post
            key={index}
            user={this.props.user}
            token={this.props.token}
            updateUser={this.props.updateUser}
            deletePost={this.props.deletePost}
            post={post}
            userPageUpdate={this.userPageUpdate}
            userPageDelete={this.userPageDelete}
            rank={index + 1}
          />
        ))}
      </div>
    );
  }
}
