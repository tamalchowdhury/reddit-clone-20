import React, { Component } from 'react';
import Post from './Post';
import Homepage from './Homepage';
import Submit from './Submit';
import Single from './Single';
import Register from './Register';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import samplePosts from './_sample';

function About() {
  return <h1>About Component</h1>;
}

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

export default class App extends Component {
  state = {
    loading: true,
    posts: [],
    user: {},
    token: '',
    loggedIn: false,
    loginError: false,
    loginMsg: ''
  };

  register = (res) => {
    this.setState({
      loggedIn: true,
      user: res.user,
      token: res.token
    });
    let userInfo = {
      loggedIn: true,
      user: res.user,
      token: res.token
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  tokenExpired = () => {
    this.logout();
  };

  login = (event) => {
    event.preventDefault();
    let user = {};
    user.username = event.target.username.value;
    user.password = event.target.password.value;
    if (user.username && user.password) {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // login successfully
            this.setState({
              loggedIn: true,
              user: res.user,
              token: res.token
            });
            let userInfo = {
              loggedIn: true,
              user: res.user,
              token: res.token
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          } else {
            this.setState({
              loginError: true,
              loginMsg: res.message
            });
          }
        })
        .catch((err) => {
          // Catch the error
          console.log(err);
          this.setState({
            loginError: true,
            loginMsg: err
          });
        });
    } else {
      this.setState({
        loginError: true,
        loginMsg: 'Missing credentials'
      });
    }
  };

  logout = () => {
    this.setState({
      loggedIn: false,
      token: undefined,
      user: {}
    });
    localStorage.removeItem('userInfo');
  };

  submitPost = (res) => {
    let posts = [...this.state.posts];
    posts.push(res.post);
    this.setState({ posts, user: res.user });
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  getTheSinglePost = (id) => {
    let posts = [...this.state.posts];
    let post = posts.filter((post) => post._id == id);
    return post[0];
  };

  // Update user after up/downvote
  updateUser = (res) => {
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id == res.post._id) {
        posts[index] = res.post;
      }
    });
    this.setState({ user: res.user, posts });
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    let updatedUserinfo = {
      loggedIn: true,
      user: res.user,
      token: userInfo.token
    };
    localStorage.setItem('userInfo', JSON.stringify(updatedUserinfo));
  };

  deletePost = (res) => {
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id == res.deletedId) {
        posts.splice(index, 1);
      }
    });
    this.setState({ posts });
  };

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      this.setState({
        loggedIn: true,
        token: userInfo.token,
        user: userInfo.user
      });
    }

    fetch('/api/posts/all')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let posts = res.data.sort((first, second) => {
            let firstScore =
              1 + first.upvotedby.length - first.downvotedby.length;
            let secondScore =
              1 + second.upvotedby.length - second.downvotedby.length;
            if (firstScore > secondScore) {
              return -1;
            } else {
              return 1;
            }
          });
          this.setState({ posts, loading: false });
        } else {
          console.log('Cannot load the file');
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <header id="header">
            <nav className="top-menu">Home - Popular - All - Random</nav>
            <div className="main-header">
              <Link to="/" id="header-img" className="default-header">
                reddit clone
              </Link>
              <div className="tab-menu" />

              <div className="user-header">
                {this.state.loggedIn ? (
                  <span>
                    Hello {this.state.user.username} |{' '}
                    <a
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={this.logout}>
                      logout
                    </a>{' '}
                  </span>
                ) : (
                  <span>
                    Want to join? <a href="#login">Log in</a> or{' '}
                    <Link to="/register">sign up</Link> in seconds.
                  </span>
                )}
              </div>
            </div>
          </header>
          <div id="container">
            <main id="body-submissions">
              <Route
                exact
                path="/"
                render={(props) => (
                  <Homepage
                    loading={this.state.loading}
                    user={this.state.user}
                    posts={this.state.posts}
                    token={this.state.token}
                    updateUser={this.updateUser}
                    deletePost={this.deletePost}
                    {...props}
                  />
                )}
              />
              <Route
                path="/submit"
                render={(props) =>
                  this.state.loggedIn ? (
                    <Submit
                      user={this.state.user}
                      token={this.state.token}
                      tokenExpired={this.tokenExpired}
                      submitPost={this.submitPost}
                      {...props}
                    />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/post/:id"
                render={(props) => (
                  <Single
                    user={this.state.user}
                    token={this.state.token}
                    updateUser={this.updateUser}
                    deletePost={this.deletePost}
                    posts={this.state.posts}
                    getTheSinglePost={this.getTheSinglePost}
                    {...props}
                  />
                )}
              />
              <Route
                path="/register"
                render={(props) =>
                  this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Register register={this.register} {...props} />
                  )
                }
              />
            </main>
            <aside id="sidebar">
              <form action="">
                <input className="search" type="text" placeholder="Search" />
              </form>
              {this.state.loggedIn ? (
                ''
              ) : (
                <div className="login-box" id="login">
                  {this.state.loginError ? (
                    <div className="login-error">
                      {this.state.loginMsg}
                      <div
                        className="close-button"
                        onClick={() => {
                          this.setState({ loginError: false });
                        }}>
                        &times;
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <form onSubmit={this.login}>
                    <input
                      className="login-username"
                      type="text"
                      name="username"
                      placeholder="username"
                      required
                    />
                    <input
                      className="login-password"
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                    />
                    <div className="login-button-area">
                      <a className="login-reset-link" href="/reset">
                        reset password
                      </a>
                      <button>login</button>
                    </div>
                  </form>
                </div>
              )}
              {this.state.loggedIn ? (
                <div className="submit-button">
                  <Link to="/submit">Submit</Link>
                </div>
              ) : (
                ''
              )}
            </aside>
          </div>
          <footer id="footer">
            <div className="fat-menu">Fat menu will go here..</div>
            <div className="copyright">Copyright info goes here..</div>
          </footer>
        </Layout>
      </BrowserRouter>
    );
  }
}
