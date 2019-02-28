import React, { Component } from 'react';

export default class Submit extends Component {
  state = {
    submit: false,
    submitMessage: 'Submitting...'
  };

  processPost = (event) => {
    this.setState({ submit: true });
    event.preventDefault();
    let post = {};
    post.title = event.target.title.value.trim();
    post.text = event.target.text.value.trim();
    post.created = Date.now();
    post.author = this.props.user._id;
    post.username = this.props.user.username;

    if (post.title) {
      fetch('/api/posts/new', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Posted successfully!
            this.props.submitPost(res);
            this.props.history.push(`/post/${res.post._id}`);
          } else if (res.tokenExpired) {
            this.props.tokenExpired();
          } else {
            this.setState({
              submit: true,
              submitMessage: 'Something went wrong, please contact the admin'
            });
            console.log(res.message);
          }
        })
        .catch((err) => {
          this.setState({
            submit: true,
            submitMessage:
              'The server encountered an error, please contact the admin'
          });
        });
      event.target.reset();
    } else {
      this.setState({
        submit: true,
        submitMessage: 'Missing required information'
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
            <input name="title" type="text" required />
          </div>
          <div className="input-box">
            <label htmlFor="text">text (optional)</label>
            <textarea name="text" id="" rows="6" />
          </div>
          <button>submit</button>
          {this.state.submit ? (
            <span>
              <small> {this.state.submitMessage}</small>
            </span>
          ) : (
            ''
          )}
        </form>
      </div>
    );
  }
}
