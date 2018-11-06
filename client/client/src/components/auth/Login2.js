import React, { Component } from "react";
import "./assets/css/styles.css";
import image from "./assets/img/avatar_2x.png";

class Login2 extends Component {
  render() {
    return (
      <div className="login-card">
        <img src={image} className="profile-img-card" />
        <p className="profile-name-card"> </p>
        <form className="form-signin">
          <span className="reauth-email"> </span>
          <input
            className="form-control"
            type="email"
            required=""
            placeholder="Email address"
            autofocus=""
            id="inputEmail"
          />
          <input
            className="form-control"
            type="password"
            required=""
            placeholder="Password"
            id="inputPassword"
          />
          <div className="checkbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="formCheck-2"
              />
              <label className="form-check-label" for="formCheck-2">
                Remember me
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary btn-block btn-lg btn-signin"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <a href="#" className="forgot-password">
          Forgot your password?
        </a>
      </div>
    );
  }
}

export default Login2;
