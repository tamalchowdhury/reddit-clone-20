import React, { Component } from 'react';
import Post from './Post';
import Homepage from './Homepage';
import Submit from './Submit';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function About() {
  return <h1>About Component</h1>;
}

function Single() {
  return <h1>Single Reddit Page</h1>;
}

function Layout(props) {
  return <div id="layout">{props.children}</div>;
}

export default class App extends Component {
  state = {
    posts: JSON.parse(localStorage.getItem('posts')) || []
  };

  submitPost = (post) => {
    let posts = [...this.state.posts];
    posts.push(post);
    this.setState({ posts });
    localStorage.setItem('posts', JSON.stringify(posts));
    console.log('Saved!');
    return true;
  };

  // componentDidMount() {
  //   let posts = localStorage.getItem(posts) || [];
  //   this.setState({ posts });
  // }

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

              <div className="user-header">tamalweb (2,214) Message logout</div>
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
              <Route path="/:post" component={Single} />
            </main>
            <aside id="sidebar">
              <form action="">
                <input className="search" type="text" placeholder="Search" />
              </form>
              Sidebar for login/register area
              <p>
                <Link to="/submit">Submit</Link>
              </p>
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
