import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Post extends Component {
  upvote = (user, id) => {
    fetch(`/api/post/${id}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Upvoted successfully!
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        // this.props.history.push('/?message=failed');
        console.log(err);
      });
  };

  render() {
    let { title, text, votes, created, username, _id } = this.props.post;
    let { upvotes } = this.props.user;

    return (
      <div className="post">
        <div className="rank">{this.props.rank}</div>
        <div className="votes">
          <div
            className={`arrow up ${
              upvotes && upvotes.includes(_id) ? 'upvoted' : ''
            }`}
            onClick={() => this.upvote(this.props.user, _id)}
          />
          <div className="score">{votes ? votes : '●'}</div>
          <div className="arrow down" />
        </div>
        <a href="#" className="thumbnail self" />
        <div className="content">
          <div className="title-area">
            <span className="title">
              <Link to={`/post/${_id}`}>{title}</Link>
            </span>
            <span className="url">(self.subreddit)</span>
          </div>
          <div className="meta-area">
            Submitted {moment(created).fromNow()} by {username} to r/cobra
          </div>
          <div className="link-area">10 comments share save hide report</div>
        </div>
      </div>
    );
  }
}
