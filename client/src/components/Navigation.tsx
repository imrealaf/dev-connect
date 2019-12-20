/**
 *  Navigation
 *
 *  @type UI Component
 *  @desc navigation component displaying items based on auth state
 */

import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavbarProps,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import pages from "../data";
import * as routes from "../constants/routes";
import { NavigationLink } from "../types/Navigation";
import { publicNav, privateNav } from "../constants/navigation";
import { useToggle, useLogout } from "../hooks";

import { SidePanel } from "./ui";

interface INavigationProps extends NavbarProps {
  shadow: boolean;
  isAuthenticated: boolean;
  user: any;
  location: any;
}

const Navigation: React.FC<INavigationProps> & {
  defaultProps: Partial<INavigationProps>;
} = ({ isAuthenticated, user, shadow, location, ...rest }) => {
  /*
   *  Logout function
   */
  const logout = useLogout();

  /*
   *  Panel api
   */
  const panel = useToggle();

  /*
   *  On location change
   */
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
          <NavLink className="nav-link px-0" to={item.path}>
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  /*
   *  Get generic items
   */
  const getGenericItems = () => {
    return pages.map((item: any, i) => {
      return (
        <React.Fragment key={i}>
          <NavLink
            className={`nav-link text-sm text-secondary p-0${
              i > 0 ? " ml-3" : ""
            }`}
            to={item.path}
          >
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  const panelHeader = () => {
    return isAuthenticated ? (
      user !== null ? (
        <Row className="mb-3 align-items-center">
          <Col xs={3} className="pr-0">
            <img
              className="img-fluid img-circle"
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}'s profile pic`}
            />
          </Col>
          <Col xs={9} className="pl-3">
            <h6 className="mb-0 font-light lh-1">{`${user.firstName} ${user.lastName}`}</h6>
            <small className="text-secondary">{user.email}</small>
          </Col>
        </Row>
      ) : null
    ) : (
      <React.Fragment>
        <Link
          to={isAuthenticated ? routes.DASHBOARD : routes.LANDING}
          className="sidepanel_logo mb-3 text-primary font-light text-lg"
        >
          <FontAwesomeIcon className="mr-1" icon={["fas", "code"]} size="1x" />{" "}
          <span>{config.appName}</span>
        </Link>
        <Row className="mb-3">
          <Col className="pr-1">
            <Link
              to={routes.SIGN_UP}
              className="btn btn-block btn-pill btn-primary btn-sm"
            >
              <strong>Sign Up</strong>
            </Link>
          </Col>
          <Col className="pl-1">
            <Link
              to={routes.LOGIN}
              className="btn btn-block btn-pill btn-secondary btn-sm"
            >
              Log In
            </Link>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  /*
   *  Classes function
   */
  const className = (): string => {
    const classes = ["navigation"];
    if (shadow) classes.push("navigation-shadow");
    return classes.join(" ");
  };

  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar className={className()} {...rest}>
        <Container fluid>
          {/* Logo */}
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

          {/* Side nav toggle */}
          <Navbar.Toggle
            className={rest.variant === "dark" ? "text-white" : "text-dark"}
            aria-controls="sidepanel"
            onClick={panel.toggle}
          />
        </Container>
      </Navbar>

      {/* Side navigation */}
      <SidePanel id="sidepanel" {...panel}>
        {/* Panel header */}
        {panelHeader()}

        {/* Panel items */}
        <Nav className="flex-column">{getItems()}</Nav>

        {/* Log out (if authenticated) */}
        {isAuthenticated ? (
          <Button
            variant="outline-secondary"
            className="btn-pill btn-sm mt-3 px-3"
            onClick={logout}
          >
            Log Out
          </Button>
        ) : null}

        <div className="sidepanel_bottom">
          <Nav>{getGenericItems()}</Nav>
        </div>
      </SidePanel>
    </React.Fragment>
  );
};

Navigation.defaultProps = {
  bg: "dark",
  shadow: true,
  variant: "dark",
  expand: false
};

export default Navigation;
