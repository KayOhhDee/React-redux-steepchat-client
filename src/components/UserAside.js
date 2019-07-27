import React from 'react';
import { connect } from "react-redux";
import { uploadRequest } from "../store/actions/user";
import DefaultUserImg from '../images/user.png';
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink, faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";


const UserAside = ({profileImage, username, uploadRequest}) => {
  const handleFileUpload = ({ target }) => {
    
    const image = target.files[0];
    let data = new FormData();
    data.append("image", image, image.name);

    uploadRequest(data);
  }
  return (
    <Col xl={{ size: 3, offset: 1 }}>
      <aside>
        <div className="card">
          <div className="view">
            <img
              src={profileImage || DefaultUserImg}
              alt={username}
              className="card-image"
              width="160"
              height="150"
            />
            <Link to="/"><span className="img-edit"><FontAwesomeIcon icon={faPen}/></span></Link>
            <input type="file" onChange={handleFileUpload} />
          </div>
          <div className="card-body">
            <h4 className="card-body-username">
              <Link to="/">@{username}</Link>
            </h4>
            <p className="card-body-bio">Hi Im new here and I just wanna make friends</p>
            <p className="card-body-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} />  {"Ghana, Kumasi"}
            </p>
            <p className="card-body-web">
              <FontAwesomeIcon icon={faLink} /> <a href={"www.google.com"}>{"www.google.com"}</a>
            </p>
            <Link to="/"><span className="card-body-edit"><FontAwesomeIcon icon={faPen}/></span></Link>
          </div>
          <div className="card-footer">
            <FontAwesomeIcon icon={faCalendar} /> Joined {"July, 2019"}
          </div>
        </div>
      </aside>
    </Col>
  );
}

export default connect(null, { uploadRequest })(UserAside);