import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container, Row, Col 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPlus, faHome, faBell } from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <nav>
          <Navbar expand="xs">
            <NavbarBrand>
              <Link to="/">SteepChat</Link>
            </NavbarBrand>
            {this.props.currentUser.isAuthenticated ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="profileIco">
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle className="profileIco" nav caret>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <a onClick={this.logout}>Profile</a>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <a onClick={this.logout}>Log out</a>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/signup">Sign up</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/signin">Log in</Link>
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Navbar>
        </nav>
        {this.props.currentUser.isAuthenticated && (
          <Container className="secondNav">
            <Row>
              <Col>
                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </Col>
              <Col>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </Col>
              <Col>
                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                  <FontAwesomeIcon icon={faBell} />
                </Link>
                <span className="counter">22</span>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(NavBar);