import React, { Component } from 'react';

export default class Single extends Component {
  render() {
    let post = this.props.getTheSinglePost(this.props.match.params.id);

    if (!post) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    let { title, text, created, votes } = post;

    return (
      <div>
        <h1>{title}</h1>
        {text ? <p>{text}</p> : ''}
      </div>
    );
  }
}
