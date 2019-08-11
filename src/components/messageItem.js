import React, {Component} from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultUserImg from '../images/user.png';
import DeleteMessage from './DeleteMessage';
import MessageModal from './MessageModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEllipsisH,
  faHeart as faHeartSolid
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart, faEye } from "@fortawesome/free-regular-svg-icons";


class MessageItem extends Component {
  constructor() {
    super();

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggle = this.toggle.bind(this)

    this.myRef = React.createRef();

    this.state = {
      popupVisible: false,
      modal: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  handleDeleteClick() {
    if (!this.state.popupVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  }

  handleOutsideClick(e) {
    const node = this.myRef.current;
    if (node.contains(e.target)) {
      return;
    }

    this.handleDeleteClick();
  }

  render() {
    const {
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
      authenticated,
      messageId,
      userId
    } = this.props;

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
              <Link to={`/users/${userId}`}>@{username}</Link>
              <p className="text-muted">
                <Moment className="text-muted" fromNow>
                  {date}
                </Moment>
              </p>
            </div>
            {isCorrectUser && (
              <div ref={this.myRef} className="option-btn">
                <span onClick={this.handleDeleteClick}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </span>
                {this.state.popupVisible && (
                  <div className="option-content">
                    <DeleteMessage removeMessage={removeMessage} />
                  </div>
                )}
              </div>
            )}
            <span className="view-btn tooltipper">
              <FontAwesomeIcon onClick={this.toggle} icon={faEye} />
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
                  <FontAwesomeIcon
                    data-heartsolid
                    onClick={unlikeMessage}
                    icon={faHeartSolid}
                  />
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
                <FontAwesomeIcon onClick={this.toggle} icon={faComment} />
                <span className="tooltiptext">Comment</span>
              </span>
              {`${commentCount} comments`}
            </span>
          </div>
          {this.state.modal && (
            <MessageModal
              toggle={this.toggle}
              modalState={this.state.modal}
              messageId={messageId}
              userId={userId}
              authenticated={authenticated}
              likedMessage={likedMessage}
              likeMessage={likeMessage}
              unlikeMessage={unlikeMessage}
              profileImage={profileImage}
              username={username}
            />
          )}
        </li>
      </div>
    );
  }
}

export default MessageItem;