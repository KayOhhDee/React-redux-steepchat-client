import React from 'react';
import DefaultUserImg from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLink, faCalendar } from "@fortawesome/free-solid-svg-icons";

const LoadingProfile = () => {
  return (
    <div>
      <aside>
            <div className="card">
              <div className="view">
                <img
                  src={ DefaultUserImg}
                  alt="profile-pic"
                  className="card-image"
                  width="160"
                  height="150"
                />
              </div>
              <div className="card-body">
                <div className="card-body-username">
                  <div style={{height:"20px", width:"60px", margin:"0 auto", backgroundColor:"#8E54E9"}} />
                </div>
                <div className="card-body-bio">
                  <div style={{width:"100%", height:"15px", marginBottom:"7px", backgroundColor:"rgba(0,0,0,.4)"}} />
                  <div style={{width:"80%", margin:"0 auto", height:"15px", backgroundColor:"rgba(0,0,0,.4)"}} />
                </div>
                <div className="card-body-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  {"Location"}
                </div>
                <div className="card-body-web">
                  <FontAwesomeIcon icon={faLink} />{" "}
                    {"http://website.com"}
                </div>
              </div>
              <div className="card-footer">
                <FontAwesomeIcon icon={faCalendar} />{" "}
                {"Joined date"}
              </div>
            </div>
      </aside>
    </div>
  );
}

export default LoadingProfile;
