import React from "react";
import { Link } from "react-router-dom";
import "../styles/homePage.css";

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <div className="topnav" id="myTopnav">
          <Link to="/">
            <button className={this.props.active === "home" ? "active" : ""}>
              Home
            </button>
          </Link>
          <Link to="/products">
            <button
              className={this.props.active === "products" ? "active" : ""}
            >
              Products
            </button>
          </Link>
          <div className="NavBarRight">
            <Link to="/login">
              <button>Logout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
