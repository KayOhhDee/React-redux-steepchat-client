import React from 'react';
import { connect } from "react-redux";
import { uploadRequest } from "../store/actions/user";
import DefaultUserImg from '../images/user.png';
import { Link } from "react-router-dom";
import EditInfo from './EditInfo';
import Moment from "react-moment";
import { UncontrolledTooltip, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink, faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";


const UserAside = ({
  profileImage, 
  username, 
  loading, 
  authenticated, 
  bio, 
  website, 
  location, 
  date, 
  uploadRequest
}) => {
  const handleFileUpload = ({ target }) => {  
    const image = target.files[0];
    let data = new FormData();
    data.append("image", image, image.name);

    uploadRequest(data);
  }

  const handleEditImage = () => {
    let fileInput = document.getElementById('fileInput');
    fileInput.click();
  }
  
  return (
    <Col xl={{ size: 3, offset: 1 }}>
      <aside>
      {!loading ? (authenticated ? (
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
              <span id="editImage" onClick={handleEditImage} className="img-edit">
                <FontAwesomeIcon icon={faPen}/>
              </span>
            </Link>
            <UncontrolledTooltip placement="top" target="editImage">
              Edit Profile Image
            </UncontrolledTooltip>
            <input id="fileInput" type="file" onChange={handleFileUpload} />
          </div>
          <div className="card-body">
            <h4 className="card-body-username">
              <Link to="/">@{username}</Link>
            </h4>
            {bio && <p className="card-body-bio">{bio}</p>}
            {location && <p className="card-body-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}{location}</p>}
            {website && <p className="card-body-web">
              <FontAwesomeIcon icon={faLink} /> <a href={website}>{website}</a>
            </p>}
            <EditInfo />
          </div>
          <div className="card-footer">
            <FontAwesomeIcon icon={faCalendar} /> Joined{' '} 
              <Moment format="Do MMM YYYY">
                {date}
              </Moment>
          </div>
        </div>
      ) : (
        <div style={{padding: ".8rem"}} className="card">
          <h5 style={{
            textAlign: "center", 
            marginBottom: "2rem",
          }}>
            No Profile Found, Please log in first
          </h5>
          <Link to="/signup" className="btn">
           <Button outline color="primary">SignUp Now!</Button>
          </Link>
          <Link to="/signin" className="btn">
           <Button outline color="primary">SignIn</Button>
          </Link>
        </div>
      )) : (<p>loading...</p>)}
      </aside>
    </Col>
  );
}

export default connect(null, { uploadRequest })(UserAside);