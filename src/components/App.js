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
        <main id="body-submissions">All reddit posts will go here..</main>
        <aside id="sidebar">Sidebar for login/register area</aside>
        <footer id="footer">
          <div className="fat-menu">Fat menu will go here..</div>
          <div className="copyright">Copyright info goes here..</div>
        </footer>
      </div>
    );
  }
}
