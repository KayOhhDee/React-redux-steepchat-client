import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import Notifications from './Notifications';
import { logout } from '../store/actions/auth';
import {
  Navbar,
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
import { faUserCircle, faHome } from "@fortawesome/free-solid-svg-icons";

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
            <Link className="brand-link" to="/">SteepChat</Link>
            {this.props.currentUser.isAuthenticated ? (
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="profileIco" nav caret>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </DropdownToggle>
                  <DropdownMenu right className="profile-menu">
                    <DropdownItem className="profile">
                      <Link className="profileIco"
                        style={{ color: "black", fontWeight: "400" }}
                        to={"/user/profile"}
                      >
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider className="profile" />
                    <DropdownItem>
                      <div onClick={this.logout}>Log out</div>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
                <Notifications />
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