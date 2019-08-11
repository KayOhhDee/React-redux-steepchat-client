import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../store/actions/user";
import MessageList from "./MessageList";
import UserAside from "../components/UserAside";
import axios from "axios";
import { Container, Row } from "reactstrap";

class User extends Component {
  state = {
    profile: null,
    noPost : false
  };

  userInfo = {};

  componentDidMount() {
    const handle = this.props.match.params.id;
    this.props.getUserData(handle);
    axios
      .get(`/api/users/${handle}`)
      .then(data =>
        this.setState({
          profile: data,
          noPost: true
        })
      )
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id){
      const handle = this.props.match.params.id;
      this.props.getUserData(handle);
      axios
        .get(`/api/users/${handle}`)
        .then(data =>
          this.setState({
            profile: data
          })
        )
        .catch(error => console.log(error));
    }
  }
  

  render() {
    const { messages } = this.props.messages;
    const messagesCollection =
      !messages.length ? (
        this.state.noPost && <p>No post from this user</p>
      ) : (
        <MessageList usermessages={messages} />
      );

    if(this.state.profile !== null && this.state.profile !== undefined) {
      this.userInfo = this.state.profile.data;
    }
    
    return (
      <Container>
        <Row>
          <UserAside userDetails={this.userInfo} />
          {messagesCollection}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
