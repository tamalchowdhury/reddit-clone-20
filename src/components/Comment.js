import React, { Component } from 'react';
import moment from 'moment';

export default class Comment extends Component {
  render() {
    let { comment, username, created, _id } = this.props.comment;

    return (
      <div className="single-comment" id={`comment-id-${_id}`}>
        <div className="comment-author">
          {username} {moment(created).fromNow()}
        </div>
        <div className="comment-body">{comment}</div>
        <div className="comment-meta">permalink delete reply</div>
      </div>
    );
  }
}
