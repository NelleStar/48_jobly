import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import userContext from "../../userContext";

function NavBar({ logOut }) {
  const { token, username } = useContext(userContext);

  if (token) {
    return (
      <div className="navbar-container">
        <Navbar expand="md">
          <NavLink to="/" className="NavbarBrand">
            Jobly
          </NavLink>
          <Nav className="ml-auto navbar-nav">
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`/users/${username}`}>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" onClick={logOut}>
                Log out, {username}
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div className="navbar-container">
        <Navbar expand="md">
          <NavLink to="/" className="NavbarBrand">
            Jobly
          </NavLink>
          <Nav className="ml-auto navbar-nav">
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Signup</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;