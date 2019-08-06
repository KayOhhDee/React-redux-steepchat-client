import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageForm from './MessageForm'
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
  UncontrolledTooltip,
  Container, Row, Col 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHome, faBell } from "@fortawesome/free-solid-svg-icons";

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
                          <span onClick={this.logout}>Profile</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <span onClick={this.logout}>Log out</span>
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
                <MessageForm />
              </Col>
              <Col>
                <Link to="/">
                  <FontAwesomeIcon id="timeline" icon={faHome} />
                </Link>
                <UncontrolledTooltip placement="top" target="timeline">
                  Timeline
                </UncontrolledTooltip>
              </Col>
              <Col>
                <Link id="notifications" to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                  <FontAwesomeIcon icon={faBell} />
                  <UncontrolledTooltip placement="top" target="notifications">
                    Notifications
                  </UncontrolledTooltip>
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