import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/actions/messages';
import MessageItem from '../components/messageItem'

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages } = this.props;
    let messageList = messages.map(item => (
      <MessageItem 
        key={item._id}
        date={item.createdAt}
        text={item.text}
        username={item.user.username}
        profileImage={item.user.profileImage}
      />
    ))
    return messageList;
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps, { fetchMessages })(MessageList)