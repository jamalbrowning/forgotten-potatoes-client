import { React } from "react";
import { Navbar, Nav } from "react-bootstrap";

import "./Navbar.css";

export const NavBar = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        {localStorage.getItem("fp_token") !== null ? (
          <Navbar.Brand href="/profile">
            <img
              src="https://i.ibb.co/F8yn53X/potato.png"
              width="30"
              height="30"
              className="d-inline-block align-top potato"
              alt="FP logo"
            />
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/login">
            <img
              src="potato.png"
              width="30"
              height="30"
              className="d-inline-block align-top potato"
              alt="FP logo"
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="ml-auto navbar ">
            {localStorage.getItem("fp_token") !== null ? (
              <Nav className="ml-auto">
                <Nav.Link href="/reviews">Reviews</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link
                  className="nav-link fakeLink"
                  onClick={() => {
                    localStorage.removeItem("fp_token");
                    props.history.push({ pathname: "/login" });
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
