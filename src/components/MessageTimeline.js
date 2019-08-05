import React, {Component} from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import { Container, Row } from "reactstrap";


class MessageTimeline extends Component {

  render() {
     return (
       <Container>
         <Row>
           <UserAside />
           <MessageList />
         </Row>
       </Container>
     );
  }
}


export default MessageTimeline