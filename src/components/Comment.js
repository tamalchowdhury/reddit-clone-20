import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Comment extends Component {
  upvote = () => {
    if (this.props.user._id) {
      fetch(`/api/comment/${this.props.comment._id}/upvote`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Upvoted successfully!
            console.log(res);
            this.props.updateComment(res.comment);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          // this.props.history.push('/?message=failed');
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };
  downvote = (user, id) => {
    if (this.props.user._id) {
      fetch(`/api/post/${id}/downvote`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Downvoted successfully!
            this.props.updateUser(res);
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };

  deleteComment = () => {
    fetch(`/api/post/${this.props.comment._id}/comment`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.user)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Deleted successfully!
          // Remove the comment from the state
          this.props.deleteComment(this.props.comment._id);
          console.log(res);
        } else {
          if (res.tokenExpired) {
            // this.props.tokenExpired();
          }
          console.log(res);
        }
      })
      .catch((err) => {
        // this.props.history.push('/?message=failed');
        console.log(err);
      });
  };

  render() {
    let {
      comment,
      author,
      username,
      created,
      _id,
      upvotedby,
      downvotedby
    } = this.props.comment;
    let { user } = this.props;

    return (
      <div className="single-comment" id={`comment-id-${_id}`}>
        <div className="votes">
          <div
            className={`arrow up ${
              user && upvotedby.includes(user._id) ? 'upvoted' : ''
            }`}
            onClick={this.upvote}
          />
          <div className="arrow down" onClick={this.downvote} />
        </div>
        <div className="comment">
          <div className="comment-author">
            <Link to={`/user/${username}`}>{username}</Link>{' '}
            {moment(created).fromNow()}
          </div>
          <div className="comment-body">{comment}</div>
          <div className="comment-meta">
            {author == this.props.user._id || this.props.user.isAdmin ? (
              <span className="fake-link" onClick={this.deleteComment}>
                Delete
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
