import { React } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "./Navbar.css";

export const NavBar = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Forgotten Potatoes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="ml-auto navbar ">
            {localStorage.getItem("fp_token") !== null ? (
              <Nav className="ml-auto">
                <Nav.Link href="/reviews">Reviews</Nav.Link>
                <Nav.Link href="#pricing">Profile</Nav.Link>
                <Nav.Link
                  className="nav-link fakeLink"
                  onClick={() => {
                    localStorage.removeItem("fp_token");
                    props.history.push({ pathname: "/" });
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
