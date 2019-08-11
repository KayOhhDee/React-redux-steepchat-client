import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchMessages,
  removeMessage,
  likeMessage,
  unlikeMessage
} from "../store/actions/messages";
import MessageItem from "../components/messageItem";
import { Col } from "reactstrap";

class MessageList extends Component {
  componentDidMount() {
    !this.props.usermessages && this.props.fetchMessages();
  }

  removeMessage = (user_id, message_id) => {
    this.props.removeMessage(user_id, message_id)
  }

  likedMessage = message_id => {
    if (
      this.props.currentUser.user.likes &&
      this.props.currentUser.user.likes.find(l => l.message === message_id)
    )
      return true;
    else return false;
  };

  likeMessage = (message_id) => {
    this.props.likeMessage(message_id)
  }

  unlikeMessage = (message_id) => {
    this.props.unlikeMessage(message_id)
  }

  render() {
    const { messages, usermessages, currentUser, loading } = this.props;
    let messageList = !loading ? (
      usermessages ? (usermessages.map(item => (
        <MessageItem
          key={item._id}
          date={item.createdAt}
          text={item.text}
          messageId={item._id}
          userId={item.user._id}
          username={item.user.username}
          profileImage={item.user.profileImage}
          likeCount={item.likeCount}
          commentCount={item.commentCount}
          removeMessage={this.removeMessage.bind(this, item.user._id, item._id)}
          likedMessage={this.likedMessage.bind(this, item._id)}
          likeMessage={this.likeMessage.bind(this, item._id)}
          unlikeMessage={this.unlikeMessage.bind(this, item._id)}
          isCorrectUser={currentUser.user._id === item.user._id}
          authenticated={currentUser.isAuthenticated}
        />
      ))) : (messages.map(item => (
        <MessageItem
          key={item._id}
          date={item.createdAt}
          text={item.text}
          messageId={item._id}
          userId={item.user._id}
          username={item.user.username}
          profileImage={item.user.profileImage}
          likeCount={item.likeCount}
          commentCount={item.commentCount}
          removeMessage={this.removeMessage.bind(this, item.user._id, item._id)}
          likedMessage={this.likedMessage.bind(this, item._id)}
          likeMessage={this.likeMessage.bind(this, item._id)}
          unlikeMessage={this.unlikeMessage.bind(this, item._id)}
          isCorrectUser={currentUser.user._id === item.user._id}
          authenticated={currentUser.isAuthenticated}
        />
      )))
    ) : (
      <p>loading...</p>
    );
    return (
      <Col className="messageList" xl="7">
        <ul className="list-group" id="messages">
          {messageList}
        </ul>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.messages.loading,
    messages: state.messages.messages,
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  {
    fetchMessages,
    removeMessage,
    likeMessage,
    unlikeMessage
  }
)(MessageList);
