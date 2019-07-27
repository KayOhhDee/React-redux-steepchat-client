import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import { Container, Row } from "reactstrap";


const MessageTimeline = ({profileImage, username, loading, authenticated}) => {
  return (
    <Container>
      <Row>
        <UserAside
          profileImage={profileImage}
          username={username}
          loading={loading}
          authenticated={authenticated}
        />
        <MessageList />
      </Row>
    </Container>
  );
}

export default MessageTimeline;