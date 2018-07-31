import React from "react";
import { Link } from "react-router-dom";
import { login, logout } from "../utils/Auth";

export default class Menu extends React.Component {
  render(props) {
    return (
      <div>
        <section className="jumbotron">
          <img src="logo.png" alt="logo" />
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
        </section>
      </div>
    );
  }
}