import React, { Component } from 'react';
import Post from './Post';

export default class App extends Component {
  render() {
    return (
      <div className="" id="layout">
        <header id="header">
          <nav class="top-menu">Home - Popular - All - Random</nav>
          <div className="main-header">
            <a href="/" id="header-img" className="default-header">
              reddit clone
            </a>
            <div className="tab-menu" />
            <div className="user-header">tamalweb (2,214) Message logout</div>
          </div>
        </header>
        <div id="container">
          <main id="body-submissions">
            <Post />
            <Post />
            <Post />
            <Post />

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
