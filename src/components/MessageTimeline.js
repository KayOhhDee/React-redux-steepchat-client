import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import { Container, Row } from "reactstrap";


const MessageTimeline = props => {
  return (
    <Container>
      <Row>
        <UserAside profileImage={props.profileImage} username={props.username}/>
        <MessageList />
      </Row>
    </Container>
  )
}

export default MessageTimeline;