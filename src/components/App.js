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
              <div className="rank">1</div>
              <div className="votes">
                <div className="arrow up" />
                <div className="score">207</div>
                <div className="arrow down" />
              </div>
              <a href="#" className="thumbnail self" />
              <div className="content">
                <div className="title-area">
                  <span className="title">
                    <a href="">Are we supposed to like Miguel?</a>
                  </span>
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
