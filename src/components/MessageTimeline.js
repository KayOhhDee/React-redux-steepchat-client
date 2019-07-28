import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import { Container, Row } from "reactstrap";


const MessageTimeline = ({profileImage, username, loading, authenticated, bio, website, location, date}) => {
  return (
    <Container>
      <Row>
        <UserAside
          profileImage={profileImage}
          username={username}
          loading={loading}
          authenticated={authenticated}
          bio={bio}
          website={website}
          location={location}
          date={date}
        />
        <MessageList />
      </Row>
    </Container>
  );
}

export default MessageTimeline;