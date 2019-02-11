import React, { Component } from 'react';

export default class Submit extends Component {
  processPost = (event) => {
    event.preventDefault();
    let post = {};
    post.title = event.target.title.value;
    post.text = event.target.text.value;
    if (post.title) {
      let result = this.props.submitPost(post);
      if (result) {
        this.props.history.push('/');
      }
    }
  };

  render() {
    return (
      <div>
        <h3>Submit a new post</h3>
        <form onSubmit={this.processPost} className="submit-form" action="">
          <div className="input-box">
            <label htmlFor="title">title</label>
            <input name="title" type="text" />
          </div>
          <div className="input-box">
            <label htmlFor="text">text (optional)</label>
            <textarea name="text" id="" rows="6" />
          </div>
          <button>submit</button>
        </form>
      </div>
    );
  }
}
