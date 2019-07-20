import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultUserImg from '../images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const MessageItem = ({ date, profileImage, text, username, removeMessage, isCorrectUser }) => {
  return (
    <div>
      <li className="list-group-item">
        <div className="list-item-info">
          <img
            src={profileImage || DefaultUserImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <div className="message-area">
            <Link to="/">@{username} &nbsp;</Link>
            <p className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </p>
          </div>
          {isCorrectUser && (
            <span className="delete-btn" onClick={removeMessage}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          )}
        </div>
        <div>
          <p>{text}</p>
        </div>
        <div>
          <span>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>
            <FontAwesomeIcon icon={faComment} />
          </span>
        </div>
      </li>
    </div>
  );
}

export default MessageItem;