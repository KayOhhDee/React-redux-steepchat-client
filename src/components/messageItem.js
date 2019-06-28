import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultUserImg from '../images/user.png';

const MessageItem = ({ date, profileImage, text, username }) => {
  return (
    <div>
      <img
        src={profileImage || DefaultUserImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
      <div className="message-area">
        <Link to="/">@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MessageItem;