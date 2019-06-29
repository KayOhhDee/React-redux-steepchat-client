import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/messageItem'

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages, removeMessage } = this.props;
    let messageList = messages.map(item => (
      <MessageItem 
        key={item._id}
        date={item.createdAt}
        text={item.text}
        username={item.user.username}
        profileImage={item.user.profileImage}
        removeMessage={removeMessage.bind(this, item.user._id, item._id)}
      />
    ))
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
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
    messages: state.messages
  }
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageList)