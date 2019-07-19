import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/messageItem'

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
      <div className="col-lg-7">
        <div className="">
          <ul className="list-group" id='messages'>
            {messageList}
          </ul>
        </div>
      </div>
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