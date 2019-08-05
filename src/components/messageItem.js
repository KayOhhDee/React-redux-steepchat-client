import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultUserImg from '../images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEllipsisH,
  faHeart as faHeartSolid
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


const MessageItem = ({ 
  date, 
  profileImage, 
  text, 
  username,
  likeCount,
  commentCount, 
  removeMessage, 
  isCorrectUser,
  likeMessage,
  unlikeMessage,
  likedMessage,
  authenticated 
}) => {
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
            <Link to="/">@{username}</Link>
            <p className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </p>
          </div>
          {isCorrectUser && (
            <UncontrolledDropdown className="option-btn">
              <DropdownToggle className="option-btn">
                <span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </span>
              </DropdownToggle>
              <DropdownMenu
                style={{
                  padding: "0",
                  minWidth: "0",
                  top: "32px",
                  left: "-65px"
                }}
              >
                <DropdownItem
                  style={{
                    textAlign: "center",
                    padding: ".2rem .9rem",
                    fontSize: ".95rem"
                  }}
                  onClick={removeMessage}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          <span className="view-btn tooltipper">
            <FontAwesomeIcon icon={faEye} />
            <span className="tooltiptext">View</span>
          </span>
        </div>
        <div>
          <p className="post">{text}</p>
        </div>
        <div className="reactions">
          <span>
            {!authenticated ? (
              <Link to="/signin">
                <span className="tooltipper">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="tooltiptext">Like</span>
                </span>
              </Link>
            ) : likedMessage() ? (
              <span className="tooltipper">
                <FontAwesomeIcon data-heartsolid onClick={unlikeMessage} icon={faHeartSolid} />
                <span className="tooltiptext">Unlike</span>
              </span>
            ) : (
              <span className="tooltipper">
                <FontAwesomeIcon onClick={likeMessage} icon={faHeart} />
                <span className="tooltiptext">Like</span>
              </span>
            )}
            {`${likeCount} likes`}
          </span>
          <span>
            <span className="tooltipper">
              <FontAwesomeIcon icon={faComment} />
              <span className="tooltiptext">Comment</span>
            </span>
            {`${commentCount} comments`}
          </span>
        </div>
      </li>
    </div>
  );
}

export default MessageItem;