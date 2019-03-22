import React, { Component } from 'react';
import Post from './Post';
import Comment from './Comment';
import Loading from '../img/loading.gif';
import InnerHTML from 'react-dangerous-html';

export default class Single extends Component {
  state = {
    post: null,
    comments: [],
    submit: false,
    notFound: false
  };

  deleteComment = (id) => {
    let comments = [...this.state.comments];
    comments.forEach((comment, index) => {
      if (comment._id === id) {
        comments.splice(index, 1);
      }
    });
    this.setState({ comments });
  };
  // Applicable for single pages
  updatePostAfterVotes = (post) => {
    this.setState({ post });
  };

  // Update a comment to state after up/downvote
  updateComment = (updatedComment) => {
    let comments = [...this.state.comments];
    comments.forEach((comment, index) => {
      if (comment._id === updatedComment._id) {
        comments[index] = updatedComment;
      }
    });
    this.setState({ comments });
  };

  postComment = (event) => {
    this.setState({ submit: true });
    event.preventDefault();
    let comment = event.target.comment.value.trim();
    if (comment) {
      event.target.reset();
      let postId = this.props.match.params.id;
      let commentObject = {
        comment,
        author: this.props.user._id,
        username: this.props.user.username,
        post: postId,
        upvotedby: this.props.user._id,
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
            this.setState({ comments, submit: false });
            this.props.history.push(`#comment-id-${res.comment._id}`);
          } else {
            this.setState({ submit: false });
          }
        })
        .catch((err) => {
          this.props.history.push('/?message=failed to post comment');
          this.setState({ submit: false });
        });
    } else {
      console.log('Comment is empty');
    }
  };

  componentDidMount() {
    let postId = this.props.match.params.id;
    fetch(`/api/post/${postId}/single`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Res success
          this.setState({ post: res.post, comments: res.comments });
        } else {
          // Res failed
          // Show not found error
          console.log(res);
          this.setState({ notFound: true, post: {} });
        }
      })
      .catch((err) => {
        // Handle the error
        console.log(err);
      });
  }

  render() {
    if (!this.state.post) {
      document.title = 'Loading..';
      return (
        <div className="center">
          <img src={Loading} alt="Loading" />
        </div>
      );
    }

    if (this.state.notFound) {
      document.title = 'Not Found';
      return (
        <div>
          <h1>Not Found</h1>
        </div>
      );
    }
    document.title = `${this.state.post.title}`;
    return (
      <div>
        <Post
          key={1}
          user={this.props.user}
          token={this.props.token}
          updateUser={this.props.updateUser}
          deletePost={this.props.deletePost}
          updatePostAfterVotes={this.updatePostAfterVotes}
          post={this.state.post}
          rank={1}
          single={true}
        />
        {this.props.banner ? (
          <div className="banner comment-banner padding">
            <InnerHTML html={this.props.banner} />
          </div>
        ) : (
          ''
        )}

        <div className="comments">
          {this.state.comments.length && this.state.comments.length > 1 ? (
            <h3>all {this.state.comments.length} comments</h3>
          ) : (
            <h3>{this.state.comments.length} comments</h3>
          )}

          {this.props.user && this.props.user._id && !this.props.user.banned ? (
            <div className="comment-form">
              <form onSubmit={this.postComment}>
                <textarea name="comment" id="" rows="5" required />
                <button>Save</button>{' '}
                {this.state.submit ? <span> posting..</span> : ''}
              </form>
            </div>
          ) : (
            ''
          )}
          {/* Single comment component will go here.. */}
          {this.state.comments.map((comment) => (
            <Comment
              token={this.props.token}
              user={this.props.user}
              comment={comment}
              deleteComment={this.deleteComment}
              key={comment._id}
              updateComment={this.updateComment}
            />
          ))}
        </div>
      </div>
    );
  }
}
