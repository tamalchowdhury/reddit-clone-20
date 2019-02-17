import React, { Component } from 'react';
import Post from './Post';
import Comment from './Comment';

export default class Single extends Component {
  state = {
    comments: []
  };

  postComment = (event) => {
    event.preventDefault();
    let comment = event.target.comment.value;
    if (comment) {
      event.target.reset();
      let postId = this.props.match.params.id;
      let commentObject = {
        comment,
        author: this.props.user._id,
        username: this.props.user.username,
        post: postId,
        created: Date.now()
      };

      fetch(`/api/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObject)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Posted successfully!
            // Do something with the post
            let comments = [...this.state.comments];
            comments.push(res.comment);
            this.setState({ comments });
            this.props.history.push(`#comment-id-${res.comment._id}`);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          this.props.history.push('/?message=failed to post comment');
        });
    } else {
      console.log('Comment is empty');
    }
  };

  componentDidMount() {
    let postId = this.props.match.params.id;
    fetch(`/api/post/${postId}/comments/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Posted successfully!
          // Do something with the post
          this.setState({ comments: res.comments });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {});
  }

  render() {
    let post = this.props.getTheSinglePost(this.props.match.params.id);

    if (!post) {
      return (
        <div>
          <h3>Loading</h3>
        </div>
      );
    }

    return (
      <div>
        <Post
          key={1}
          user={this.props.user}
          token={this.props.token}
          updateUser={this.props.updateUser}
          deletePost={this.props.deletePost}
          post={post}
          rank={1}
          single={true}
        />
        <div className="comments">
          <h3>all 10 comments</h3>
          <div className="comment-form">
            <form onSubmit={this.postComment}>
              <textarea name="comment" id="" rows="5" />
              <button>Save</button>
            </form>
          </div>
          {/* Single comment component will go here.. */}
          {this.state.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    );
  }
}
