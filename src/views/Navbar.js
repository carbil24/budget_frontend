import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function NavbarComponent() {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <div className="container">
        <Navbar.Brand href="/">Budget</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {userData.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myBudget">
                    My Budget
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/groups">
                    See My Groups
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/createGroup">
                    Create a New Group
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={() => {
                      setUserData({
                        token: undefined,
                        user: undefined,
                      });
                      localStorage.setItem("x-access-token", "");
                    }}
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </Navbar.Collapse>
        {userData.user ? (
          <span className="nav nav-pills">
            <span className="nav-link">
              {userData.user.firstName} {userData.user.lastName}
            </span>
          </span>
        ) : null}
      </div>
    </Navbar>
  );
}
