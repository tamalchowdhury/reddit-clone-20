import React, { Component } from 'react';

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
        <h3>{title}</h3>
        {text ? <p>{text}</p> : ''}
      </div>
    );
  }
}
