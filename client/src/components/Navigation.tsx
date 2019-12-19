/**
 *  Navbar
 *
 *  @type UI Component
 *  @desc navigation component displaying items based on auth state
 */

import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavbarProps } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { NavigationLink } from "../types/Navigation";
import { publicNav, privateNav } from "../constants/navigation";
import { useToggle, useLogout } from "../hooks";

import { SidePanel } from "./ui";

interface INavigationProps extends NavbarProps {
  isAuthenticated: boolean;
  location: any;
}

const Navigation: React.FC<INavigationProps> & {
  defaultProps: Partial<INavigationProps>;
} = ({ isAuthenticated, location, ...rest }) => {
  /*
   *  Logout function
   */
  const logout = useLogout();

  /*
   *  Panel api
   */
  const panel = useToggle();

  useEffect(() => {
    panel.handleClose();
  }, [location]);

  /*
   *  Get items function
   */
  const getItems = () => {
    const items = isAuthenticated ? privateNav : publicNav;
    return items.map((item: NavigationLink, i) => {
      return (
        <React.Fragment key={i}>
          <NavLink className="nav-link" to={item.path}>
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Navbar className="navigation" {...rest}>
        <Container fluid>
          <Link
            to={isAuthenticated ? routes.DASHBOARD : routes.LANDING}
            className="navbar-brand text-white mx-auto"
          >
            <FontAwesomeIcon
              className="mr-1"
              icon={["fas", "code"]}
              size="1x"
            />{" "}
            <strong>{config.appName}</strong>
          </Link>
          <Navbar.Toggle aria-controls="sidepanel" onClick={panel.toggle} />
        </Container>
      </Navbar>
      <SidePanel id="sidepanel" {...panel}>
        <Nav className="flex-column">
          {getItems()}
          {isAuthenticated ? (
            <Nav.Link className="nav-link" onClick={logout}>
              <FontAwesomeIcon
                className="mr-1"
                icon={["fas", "unlock"]}
                size="xs"
              />{" "}
              Log Out
            </Nav.Link>
          ) : (
            // <Link className="nav-link" to={routes.LOGIN}>
            //   <FontAwesomeIcon
            //     className="mr-1"
            //     icon={["fas", "lock"]}
            //     size="xs"
            //   />{" "}
            //   Log In
            // </Link>
            <Nav.Link
              className="nav-link"
              onClick={() => {
                if (!panel.show) {
                  panel.handleShow();
                } else {
                  panel.handleClose();
                }
              }}
            >
              Toggle
            </Nav.Link>
          )}
        </Nav>
      </SidePanel>
    </React.Fragment>
  );
};

Navigation.defaultProps = {
  bg: "dark",
  variant: "dark",
  expand: false
};

export default Navigation;
