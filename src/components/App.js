import React, { Component } from 'react';
import Post from './Post';
import Homepage from './Homepage';
import Submit from './Submit';
import Single from './Single';
import Register from './Register';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import samplePosts from './_sample';

function About() {
  return <h1>About Component</h1>;
}

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

export default class App extends Component {
  state = {
    posts: []
  };

  submitPost = (post) => {
    let posts = [...this.state.posts];
    posts.push(post);
    this.setState({ posts });
    localStorage.setItem('posts', JSON.stringify(posts));
    console.log('Saved!');
    return true;
  };

  getTheSinglePost = (id) => {
    let posts = [...this.state.posts];
    let post = posts.filter((post) => post._id == id);
    return post[0];
  };

  componentDidMount() {
    fetch('/api/posts/all')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let posts = res.data;
          this.setState({ posts });
        } else {
          console.log('Cannot load the file');
        }
      })
      .catch((err) => {
        console.log(err);
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
                What to join? <Link to="/login">Log in</Link> or{' '}
                <Link to="/register">sign up</Link> in seconds.
              </div>
            </div>
          </header>
          <div id="container">
            <main id="body-submissions">
              <Route
                exact
                path="/"
                render={(props) => (
                  <Homepage posts={this.state.posts} {...props} />
                )}
              />
              <Route
                path="/submit"
                render={(props) => (
                  <Submit submitPost={this.submitPost} {...props} />
                )}
              />
              <Route
                exact
                path="/post/:id"
                render={(props) => (
                  <Single getTheSinglePost={this.getTheSinglePost} {...props} />
                )}
              />
              <Route path="/register" component={Register} />
            </main>
            <aside id="sidebar">
              <form action="">
                <input className="search" type="text" placeholder="Search" />
              </form>
              <div className="login-box">
                <form action="">
                  <input
                    className="login-username"
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                  <input
                    className="login-password"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <div className="login-button-area">
                    <a className="login-reset-link" href="/reset">
                      reset password
                    </a>
                    <button>login</button>
                  </div>
                </form>
              </div>
              <div className="submit-button">
                <Link to="/submit">Submit</Link>
              </div>
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
