import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultUserImg from '../images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrashAlt,
  faComment as faCommentSolid, 
  faHeart as faHeartSolid
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart, faEye } from "@fortawesome/free-regular-svg-icons";

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
            <span className="view-btn">
              <FontAwesomeIcon icon={faEye} />
            </span>
        </div>
        <div>
          <p className="post">{text}</p>
        </div>
        <div className="reactions">
          <span>
            <FontAwesomeIcon icon={faHeart} /> {"2 likes"}
          </span>
          <span>
            <FontAwesomeIcon icon={faComment} /> {"4 comments"}
          </span>
        </div>
      </li>
    </div>
  );
}

export default MessageItem;