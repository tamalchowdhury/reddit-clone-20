import React, { Component } from 'react';
import logo from '../img/logo.png';

export default class App extends Component {
  render() {
    return (
      <div className="" id="layout">
        <header id="header">
          <nav class="top-menu">Home - Popular - All - Random</nav>
          <div className="main-header">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="tab-menu">best hot new rising</div>
            <div className="user-header">tamalweb (2,214) Message logout</div>
          </div>
        </header>
        <div id="container">
          <main id="body-submissions">
            <div className="post">
              <div className="index">1</div>
              <div className="votes">up/down</div>
              <div className="media">Media</div>
              <div className="content">
                <div className="title-area">
                  <span className="title">Are we supposed to like Miguel?</span>
                  <span className="url">(self.subreddit)</span>
                </div>
                <div className="meta-area">
                  Submitted 8 hours ago by tamal to r/cobra
                </div>
                <div className="link-area">
                  10 comments share save hide report
                </div>
              </div>
            </div>

            <div className="pagination">View more: next ></div>
          </main>
          <aside id="sidebar">
            <form action="">
              <input className="search" type="text" placeholder="Search" />
            </form>
            Sidebar for login/register area
          </aside>
        </div>
        <footer id="footer">
          <div className="fat-menu">Fat menu will go here..</div>
          <div className="copyright">Copyright info goes here..</div>
        </footer>
      </div>
    );
  }
}
