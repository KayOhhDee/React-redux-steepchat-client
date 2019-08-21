import React, {Component} from 'react';
import { connect } from "react-redux";
import { uploadRequest, getUserInfo } from "../store/actions/user";
import DefaultUserImg from '../images/user.png';
import { Link } from "react-router-dom";
import EditInfo from './EditInfo';
import LoadingProfile from './LoadingProfile';
import Moment from "react-moment";
import { UncontrolledTooltip, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink, faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";


class UserAside extends Component {
  componentDidMount() {
    this.props.getUserInfo() 
  }

  userDetails = {}

  loadingUser = false;

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
    if(this.props.userDetails !== undefined) {
      this.userDetails = {
        bio: this.props.userDetails.bio,
        profileImage: this.props.userDetails.profileImage,
        username: this.props.userDetails.username,
        website: this.props.userDetails.website,
        location: this.props.userDetails.location,
        createdAt: this.props.userDetails.createdAt,
        _id: this.props.userDetails._id
      }

      this.loadingUser = !!Object.entries(this.props.userDetails).length;
    } 

   const { currentUser: { user: { profileImage,
      username, bio,
      website,
      location,
      createdAt,
      _id },
      loading,
      isAuthenticated,     
    }, showProfile } = this.props;
    return (
      <Col xl={{ size: 3, offset: 1 }}>
        <aside>
          {(this.props.userDetails ? (
            this.loadingUser
          ) : (
            !loading
          )) ? (
            isAuthenticated ? (
              <div
                className={
                  "card " +
                  ((_id === this.userDetails._id ||
                    this.userDetails._id === undefined) &&
                  !showProfile
                    ? "hide-card"
                    : "show-card")
                }
              >
                <div className="view">
                  <img
                    src={
                      this.loadingUser
                        ? this.userDetails.profileImage
                          ? this.userDetails.profileImage
                          : DefaultUserImg
                        : profileImage || DefaultUserImg
                    }
                    alt={username}
                    className="card-image"
                    width="160"
                    height="150"
                  />
                  {(_id === this.userDetails._id ||
                    this.userDetails._id === undefined) && (
                    <div>
                      <span
                        id="editImage"
                        onClick={this.handleEditImage}
                        className="img-edit"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                      <UncontrolledTooltip
                        placement="top"
                        target="editImage"
                      >
                        Edit Profile Image
                      </UncontrolledTooltip>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    onChange={this.handleFileUpload}
                    accept="image/png, image/jpeg"
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-body-username">
                    <Link to={`/users/${this.userDetails._id || _id}`}>
                      @{this.userDetails.username || username}
                    </Link>
                  </h4>
                  {(this.loadingUser
                    ? this.userDetails.bio
                      ? this.userDetails.bio
                      : null
                    : bio) && (
                    <p className="card-body-bio">
                      {this.userDetails.bio || bio}
                    </p>
                  )}
                  {(this.loadingUser
                    ? this.userDetails.location
                      ? this.userDetails.location
                      : null
                    : location) && (
                    <p className="card-body-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                      {this.userDetails.location || location}
                    </p>
                  )}
                  {(this.loadingUser
                    ? this.userDetails.website
                      ? this.userDetails.website
                      : null
                    : website) && (
                    <p className="card-body-web">
                      <FontAwesomeIcon icon={faLink} />{" "}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={this.userDetails.website || website}
                      >
                        {this.userDetails.website || website}
                      </a>
                    </p>
                  )}
                  {(_id === this.userDetails._id ||
                    this.userDetails._id === undefined) && <EditInfo />}
                </div>
                <div className="card-footer">
                  <FontAwesomeIcon icon={faCalendar} /> Joined{" "}
                  <Moment format="Do MMM YYYY">
                    {this.userDetails.createdAt || createdAt}
                  </Moment>
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
                  <Button className="btn-style-comment" outline>
                    SignUp Now!
                  </Button>
                </Link>
                <Link to="/signin" className="btn">
                  <Button className="btn-style-comment" outline>
                    SignIn
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <LoadingProfile />
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