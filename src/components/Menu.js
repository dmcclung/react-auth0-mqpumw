import React from "react";
import { Link } from "react-router-dom";
import { login, logout } from "../utils/Auth";

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="logo.png" alt="BaseReport logo" />
          </a>
          {this.props.isLoggedIn && (
            <div className="btn btn-link" onClick={logout}>
              Logout
            </div>
          )}
          {this.props.isLoggedIn && (
            <Link to="/account">Account</Link>
          )}
          {!this.props.isLoggedIn && (            
            <a className="btn btn-link" onClick={login}>
              Login
            </a>            
          )}
        </nav>
      </div>
    );
  }
}