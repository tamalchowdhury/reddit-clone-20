import React, { Component } from "react";
import Homepage from "./Homepage";
import Submit from "./Submit";
import Single from "./Single";
import Register from "./Register";
import Admin from "./Admin";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import UserPage from "./UserPage";
import InnerHTML from "react-dangerous-html";

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

export default class App extends Component {
  state = {
    loading: true,
    posts: [],
    user: {},
    token: "",
    loggedIn: false,
    loginError: false,
    loginMsg: "Something went wrong",
    currentPage: 1,
    loadMore: true,
    codes: null,
  };

  getNextPosts = () => {
    let posts = [...this.state.posts];
    fetch(`/api/posts/50/${this.state.currentPage}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.posts.length) {
          res.posts.forEach((post) => {
            posts.push(post);
          });
          this.setState({ posts, currentPage: this.state.currentPage + 1 });
          console.log(res);
        } else {
          console.log("End of the posts");
          this.setState({ loadMore: false });
        }
      })
      .catch((err) => console.log(err));
  };

  register = (res) => {
    this.setState({
      loggedIn: true,
      user: res.user,
      token: res.token,
    });
    let userInfo = {
      loggedIn: true,
      user: res.user,
      token: res.token,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
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
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // login successfully
            this.setState({
              loggedIn: true,
              user: res.user,
              token: res.token,
            });
            let userInfo = {
              loggedIn: true,
              user: res.user,
              token: res.token,
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          } else {
            this.setState({
              loginError: true,
              loginMsg: res.message,
            });
          }
        })
        .catch((err) => {
          // Catch the error
          console.log(err);
          this.setState({
            loginError: true,
            loginMsg: err,
          });
        });
    } else {
      this.setState({
        loginError: true,
        loginMsg: "Missing credentials",
      });
    }
  };

  logout = () => {
    this.setState({
      loggedIn: false,
      token: undefined,
      user: {},
    });
    localStorage.removeItem("userInfo");
  };

  submitPost = (res) => {
    let posts = [...this.state.posts];
    posts.push(res.post);
    this.setState({ posts, user: res.user });
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  // Update user after up/downvote
  updateUser = (res) => {
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id === res.post._id) {
        posts[index] = res.post;
      }
    });

    this.setState({ posts });
  };

  deletePost = (res) => {
    let posts = [...this.state.posts];
    posts.forEach((post, index) => {
      if (post._id === res.deletedId) {
        posts.splice(index, 1);
      }
    });
    this.setState({ posts });
  };

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      this.setState({
        loggedIn: true,
        token: userInfo.token,
        user: userInfo.user,
      });
    }

    fetch("/api/posts/all")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ posts: res.data, loading: false });
          if (res.data.length < 50) {
            this.setState({ loadMore: false });
          }
        } else {
          console.log("Cannot load the file");
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });

    fetch("/api/app/content")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({ codes: json.codes });
        }
        // See if you can do anything with errors
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <header id="header">
            <nav className="top-menu" />
            <div className="main-header">
              <Link to="/" id="header-img" className="default-header">
                reddit clone
              </Link>
              <div className="tab-menu" />

              <div className="user-header">
                {this.state.loggedIn && this.state.user.isAdmin ? (
                  <span>
                    {" "}
                    <Link to="/admin">Admin Settings</Link> |{" "}
                  </span>
                ) : (
                  ""
                )}
                {this.state.loggedIn ? (
                  <span>
                    Hello{" "}
                    <Link
                      className="fake-link"
                      to={`/user/${this.state.user.username}`}
                    >
                      {this.state.user.username}
                    </Link>{" "}
                    |{" "}
                    <a className="fake-link" onClick={this.logout}>
                      logout
                    </a>{" "}
                  </span>
                ) : (
                  <span>
                    Want to join? <Link to="/register">sign up</Link> in
                    seconds.
                  </span>
                )}
              </div>
            </div>
          </header>
          <div id="container">
            <main id="body-submissions">
              {this.state.codes ? (
                <div className="banner top-banner padding">
                  <InnerHTML html={this.state.codes.topBanner} />
                </div>
              ) : (
                ""
              )}
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
                    getNextPosts={this.getNextPosts}
                    currentPage={this.state.currentPage}
                    loadMore={this.state.loadMore}
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
                path="/admin"
                render={(props) =>
                  this.state.loggedIn && this.state.user.isAdmin ? (
                    <Admin
                      {...props}
                      token={this.state.token}
                      codes={this.state.codes}
                    />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/user/:username"
                render={(props) => (
                  <UserPage
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
                exact
                path="/post/:id"
                render={(props) => (
                  <Single
                    user={this.state.user}
                    token={this.state.token}
                    banner={
                      this.state.codes ? this.state.codes.commentBanner : null
                    }
                    updateUser={this.updateUser}
                    deletePost={this.deletePost}
                    posts={this.state.posts}
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
              {/*
              <form action="">
                <input className="search" type="text" placeholder="Search" />
              </form>
              
              */}

              {this.state.loggedIn ? (
                ""
              ) : (
                <div className="login-box" id="login">
                  {this.state.loginError ? (
                    <div className="login-error">
                      {this.state.loginMsg}
                      <div
                        className="close-button"
                        onClick={() => {
                          this.setState({ loginError: false });
                        }}
                      >
                        &times;
                      </div>
                    </div>
                  ) : (
                    ""
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
                ""
              )}
              {this.state.codes ? (
                <div className="sidebar-ad">
                  <div className="banner sidebar-banner">
                    <InnerHTML html={this.state.codes.sidebarBanner} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {this.state.codes ? (
                <div className="rules-section">
                  <InnerHTML html={this.state.codes.rulesCode} />
                </div>
              ) : (
                ""
              )}
              {this.state.codes ? (
                <div className="html-section">
                  <InnerHTML html={this.state.codes.extraCode} />
                </div>
              ) : (
                ""
              )}
              <p>
                User: demo
                <br />
                Pass: 1234
              </p>
              <p>
                Developed by{" "}
                <a href="https://github.com/tamalweb" target="_blank">
                  Tamal Anwar Chowdhury
                </a>
              </p>
            </aside>
          </div>
          <footer className="center" id="footer">
            {this.state.codes ? (
              <div className="banner footer-banner padding">
                <InnerHTML html={this.state.codes.footerBanner} />
              </div>
            ) : (
              ""
            )}
            <div className="copyright" />
          </footer>
        </Layout>
      </BrowserRouter>
    );
  }
}
