import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchMessage } from "../store/actions/messages";
import Comments from './Comments';
import CommentForm from './CommentForm';
import { Link } from "react-router-dom";
import DefaultUserImg from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, Spinner } from "reactstrap";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart} from "@fortawesome/free-regular-svg-icons";

class MessageModal extends Component {
  state = {
    date: ''
  }
  componentDidMount() {
    this.props.fetchMessage(this.props.userId, this.props.messageId);
    this.setState({date: this.props.message.createdAt})
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
        comments,
        _id,
        user: { username, profileImage }
      }
    } = this.props;

    return (
      <div>
        <Modal toggle={toggle} isOpen={modalState}>
          <ModalBody style={{ padding: "0" }}>
            {this.state.date === this.props.message.createdAt ? (
              <Spinner
                style={{
                  width: "4rem",
                  height: "4rem",
                  margin: "5rem 14rem",
                  color: "#8E54E9"
                }}
                type="grow"
              />
            ) : (
              <div>
                <li
                  style={{ borderBottom: "none" }}
                  className="list-group-item"
                >
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    style={{ color: "black", outline: "none" }}
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
                      <Link to={`/users/${this.props.message.user._id}`}>
                        @{username}
                      </Link>
                      <p className="text-muted">
                        <Moment className="text-muted" fromNow>
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
                          <span title="Like" className="tooltipper">
                            <FontAwesomeIcon icon={faHeart} />
                          </span>
                        </Link>
                      ) : likedMessage() ? (
                        <span title="Unlike" className="tooltipper">
                          <FontAwesomeIcon
                            data-heartsolid
                            onClick={unlikeMessage}
                            icon={faHeartSolid}
                          />
                        </span>
                      ) : (
                        <span title="Like" className="tooltipper">
                          <FontAwesomeIcon
                            onClick={likeMessage}
                            icon={faHeart}
                          />
                        </span>
                      )}
                      {`${likeCount} likes`}
                    </span>
                    <span>
                      <span title="Comment" className="tooltipper">
                        <FontAwesomeIcon
                          onClick={this.toggle}
                          icon={faComment}
                        />
                      </span>
                      {`${commentCount} comments`}
                    </span>
                  </div>
                </li>
                <hr
                  style={{
                    marginBottom: "0",
                    marginTop: "5px",
                    border: "2px solid rgba(0,0,0,.2)"
                  }}
                />
                <CommentForm messageId={_id} />
                {comments.length >= 1 && (
                  <hr
                    style={{
                      marginBottom: "5px",
                      marginTop: "0",
                      border: "2px solid rgba(0,0,0,.2)"
                    }}
                  />
                )}
                <Comments comments={comments} />
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  message: state.messages.message,
});

export default connect(
  mapStatetoProps,
  { fetchMessage }
)(MessageModal);
