import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Markdown from 'react-markdown';

export default class Post extends Component {
  upvote = () => {
    if (this.props.user._id) {
      fetch(`/api/post/${this.props.post._id}/upvote`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: this.props.user._id })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Upvoted successfully!

            this.props.updateUser(res);
            if (this.props.single) {
              this.props.updatePostAfterVotes(res.post);
            }
            if (this.props.userPageUpdate) {
              this.props.userPageUpdate(res.post);
            }
          } else {
            console.log(res.message);
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
  downvote = () => {
    if (this.props.user._id) {
      fetch(`/api/post/${this.props.post._id}/downvote`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: this.props.user._id })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Downvoted successfully!
            this.props.updateUser(res);
            if (this.props.single) {
              this.props.updatePostAfterVotes(res.post);
            }
            if (this.props.userPageUpdate) {
              this.props.userPageUpdate(res.post);
            }
          } else {
            console.log(res.message);
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

  deletePost = (user, id) => {
    if (this.props.user._id) {
      fetch(`/api/post/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Deleted successfully!
            this.props.deletePost(res);
            if (this.props.userPageDelete) {
              this.props.userPageDelete(id);
            }
          } else {
            console.log(res.message);
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

  render() {
    let {
      title,
      text,
      created,
      username,
      upvotedby,
      downvotedby,
      score,
      author,
      _id
    } = this.props.post;

    return (
      <Fragment>
        <div className="post">
          <div className="rank">{this.props.rank}</div>
          <div className="votes">
            <div
              className={`arrow up ${
                this.props.user && upvotedby.includes(this.props.user._id)
                  ? 'upvoted'
                  : ''
              }`}
              onClick={() => this.upvote(this.props.user, _id)}
            />
            <div className="score">{score ? score : 0}</div>
            <div
              className={`arrow down ${
                this.props.user && downvotedby.includes(this.props.user._id)
                  ? 'downvoted'
                  : ''
              }`}
              onClick={() => this.downvote(this.props.user, _id)}
            />
          </div>
          <Link to={`/post/${_id}`} className="thumbnail self" />
          <div className="content">
            <div className="title-area">
              <span className="title">
                {this.props.single ? (
                  <span>{title}</span>
                ) : (
                  <Link to={`/post/${_id}`}>{title}</Link>
                )}
              </span>{' '}
              <span className="url">(self.{document.domain})</span>
            </div>
            <div className="meta-area">
              Submitted {moment(created).fromNow()} by{' '}
              <Link to={`/user/${username}`}>{username}</Link>
            </div>
            <div className="link-area">
              {author === this.props.user._id || this.props.user.isAdmin ? (
                <a
                  onClick={() => this.deletePost(this.props.user, _id)}
                  className="fake-link">
                  delete
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {this.props.single && text ? (
          <div className="post-text">
            <Markdown linkTarget="_blank" source={text} />
          </div>
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}
