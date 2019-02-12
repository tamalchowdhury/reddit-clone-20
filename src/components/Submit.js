import React, { Component } from 'react';

export default class Submit extends Component {
  processPost = (event) => {
    event.preventDefault();
    let post = {};
    post.title = event.target.title.value;
    post.text = event.target.text.value;
    // TODO Change this
    post.author = 'tamal123';
    //
    if (post.title) {
      fetch('/api/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Posted successfully!
            this.props.submitPost(res.data);
            console.log(res);
            this.props.history.push('/');
          }
        })
        .catch((err) => {
          this.props.history.push('/?message=failed');
        });
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
