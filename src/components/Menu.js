import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, logout } from "../utils/Auth";

export default class Menu extends React.Component {
  render(props) {
    return (
      <div>
        <section className="jumbotron">
          {this.props.isLoggedIn && (
            <div className="btn btn-danger btn-lg" onClick={logout}>
              Logout
            </div>
          )}
          {this.props.isLoggedIn && (
            <Link to="/account">Account</Link>
          )}
          {!this.props.isLoggedIn && (
            <p className="card-docs-description">
              <a className="btn btn-success" onClick={login}>
                Login
              </a>
            </p>
          )}
        </section>
      </div>
    );
  }
}