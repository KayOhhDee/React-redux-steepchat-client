import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/messageItem';
import { Col } from "reactstrap";


class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages, removeMessage, currentUser } = this.props;
    let messageList = messages.map(item => (
      <MessageItem 
        key={item._id}
        date={item.createdAt}
        text={item.text}
        username={item.user.username}
        profileImage={item.user.profileImage}
        removeMessage={removeMessage.bind(this, item.user._id, item._id)}
        isCorrectUser={currentUser === item.user._id}
      />
    ))
    return (
      <Col xl="7">
          <ul className="list-group" id='messages'>
            {messageList}
          </ul>
      </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageList)