import React, {Component} from 'react';
import { connect } from "react-redux";
import { uploadRequest, getUserInfo } from "../store/actions/user";
import DefaultUserImg from '../images/user.png';
import { Link } from "react-router-dom";
import EditInfo from './EditInfo';
import Moment from "react-moment";
import { UncontrolledTooltip, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink, faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";


class UserAside extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  handleFileUpload = ({ target }) => {
    const image = target.files[0];
    let data = new FormData();
    data.append("image", image, image.name);

    this.props.uploadRequest(data);
  };

  handleEditImage = () => {
    let fileInput = document.getElementById("fileInput");
    fileInput.click();
  };
  render() {
    const { currentUser: { user: {profileImage,
      username, bio,
      website,
      location,
      createdAt},
      loading,
      isAuthenticated,
     
    }} = this.props;
    return (
      <Col xl={{ size: 3, offset: 1 }}>
        <aside>
          {!loading ? (
            isAuthenticated ? (
              <div className="card">
                <div className="view">
                  <img
                    src={profileImage || DefaultUserImg}
                    alt={username}
                    className="card-image"
                    width="160"
                    height="150"
                  />
                  <Link to="/">
                    <span
                      id="editImage"
                      onClick={this.handleEditImage}
                      className="img-edit"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  </Link>
                  <UncontrolledTooltip placement="top" target="editImage">
                    Edit Profile Image
                  </UncontrolledTooltip>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={this.handleFileUpload}
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-body-username">
                    <Link to="/">@{username}</Link>
                  </h4>
                  {bio && <p className="card-body-bio">{bio}</p>}
                  {location && (
                    <p className="card-body-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
                    </p>
                  )}
                  {website && (
                    <p className="card-body-web">
                      <FontAwesomeIcon icon={faLink} />{" "}
                      <a rel="noopener noreferrer" target="_blank" href={website}>{website}</a>
                    </p>
                  )}
                  <EditInfo />
                </div>
                <div className="card-footer">
                  <FontAwesomeIcon icon={faCalendar} /> Joined{" "}
                  <Moment format="Do MMM YYYY">{createdAt}</Moment>
                </div>
              </div>
            ) : (
              <div style={{ padding: ".8rem" }} className="card">
                <h5
                  style={{
                    textAlign: "center",
                    marginBottom: "2rem"
                  }}
                >
                  No Profile Found, Please log in first
                </h5>
                <Link to="/signup" className="btn">
                  <Button outline color="primary">
                    SignUp Now!
                  </Button>
                </Link>
                <Link to="/signin" className="btn">
                  <Button outline color="primary">
                    SignIn
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <p>loading...</p>
          )}
        </aside>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { uploadRequest,getUserInfo })(UserAside);