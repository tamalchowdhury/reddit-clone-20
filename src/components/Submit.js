import React, { Component } from 'react';

export default class Submit extends Component {
  render() {
    return (
      <div>
        <h3>Submit a new post</h3>
        <form className="submit-form" action="">
          <div className="input-box">
            <label htmlFor="title">title</label>
            <input name="title" type="text" />
          </div>
          <div className="input-box">
            <label htmlFor="text">text (optional)</label>
            <textarea name="text" id="" rows="6" />
          </div>
          <button>submit</button>
        </form>
      </div>
    );
  }
}
