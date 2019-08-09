import React, { Component } from 'react';
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultUserImg from "../images/user.png";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Comments extends Component {
  render() {
    let {comments} = this.props;
    return (
      <div>
        {comments.map((comment, idx) => {
          let {text, createdAt, user: { _id, username, profileImage}} = comment
          return (
            <div key={createdAt}>
              <div
                style={{ border: "none" }}
                className="list-group-item"
              >
                <div className="list-item-info">
                  <img
                    src={profileImage || DefaultUserImg}
                    alt={username}
                    height="100"
                    width="100"
                    className="timeline-image"
                  />
                  <div className="message-area">
                    <Link to={`users/${_id}`}>@{username}</Link>{" "}
                    <span>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "3.8px",
                          verticalAlign: "middle",
                          color: "#6c757d"
                        }}
                        icon={faCircle}
                      />
                    </span>{" "}
                    <span className="text-muted">
                      <Moment className="text-muted" fromNow>
                        {createdAt}
                      </Moment>
                    </span>
                    <p style={{ marginBottom: "0" }} className="post">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
              {idx !== comments.length - 1 && (
                <hr
                  style={{
                    marginBottom: "5px",
                    marginTop: "5px",
                    borderTop: "1px solid rgba(0,0,0,.2)"
                  }}
                />
              )}
            </div>
          );
        })}
        
      </div>
    )
  }
}

export default Comments
