/**
 *  Navbar
 *
 *  @type UI Component
 *  @desc navigation component displaying items based on auth state
 */

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavbarProps } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { NavigationLink } from "../types/Navigation";
import { publicNav, privateNav } from "../constants/navigation";

// Navifation props
interface Props {}

const Navigation: React.FC<NavbarProps> & {
  defaultProps: Partial<NavbarProps>;
} = props => {
  /*
   *  Get items function
   */
  const getItems = () => {
    //const items = user.data ? privateNav : publicNav;
    const items = publicNav;
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
    <Navbar className="navigation" {...props}>
      <Container>
        <Link to="" className="navbar-brand text-white">
          <FontAwesomeIcon className="mr-1" icon={["fas", "code"]} size="1x" />{" "}
          <strong>{config.appName}</strong>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {getItems()}
            <NavLink className="nav-link" to={routes.LOGIN}>
              <FontAwesomeIcon
                className="mr-1"
                icon={["fas", "lock"]}
                size="xs"
              />{" "}
              Log In
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.defaultProps = {
  bg: "dark",
  variant: "dark",
  expand: "md"
};

export default Navigation;
