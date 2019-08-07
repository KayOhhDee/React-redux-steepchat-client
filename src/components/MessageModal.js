import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchMessage } from "../store/actions/messages";
import { Link } from "react-router-dom";
import DefaultUserImg from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart} from "@fortawesome/free-regular-svg-icons";

class MessageModal extends Component {
  componentDidMount() {
    this.props.fetchMessage(this.props.userId, this.props.messageId);
  }

  render() {
    const {
      toggle,
      modalState,
      authenticated,
      likeMessage,
      unlikeMessage,
      likedMessage,
      message: {
        likeCount,
        commentCount,
        text,
        createdAt,
        user: { username, profileImage }
      }
    } = this.props;

    return (
      <div>
        <Modal toggle={toggle} isOpen={modalState}>
          <ModalBody style={{ padding: "0" }}>
            <li className="list-group-item">
              <button
                type="button"
                className="close"
                aria-label="Close"
                style={{ color: "black" }}
                onClick={toggle}
              >
                <span aria-hidden="true">×</span>
              </button>
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
                      {createdAt}
                    </Moment>
                  </p>
                </div>
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
                      <FontAwesomeIcon
                        onClick={likeMessage}
                        icon={faHeart}
                      />
                      <span className="tooltiptext">Like</span>
                    </span>
                  )}
                  {`${likeCount} likes`}
                </span>
                <span>
                  <span className="tooltipper">
                    <FontAwesomeIcon
                      onClick={this.toggle}
                      icon={faComment}
                    />
                    <span className="tooltiptext">Comment</span>
                  </span>
                  {`${commentCount} comments`}
                </span>
              </div>
            </li>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  message: state.messages.message
});

export default connect(
  mapStatetoProps,
  { fetchMessage }
)(MessageModal);
