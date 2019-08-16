import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserInfo } from "../store/actions/user";
import UserAside from "../components/UserAside";

class AuthUser extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div>
        <UserAside showProfile currentUser={this.props.currentUser} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}


export default connect(
  mapStateToProps,
  { getUserInfo }
)(AuthUser);
