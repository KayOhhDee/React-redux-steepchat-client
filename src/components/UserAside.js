import React from 'react';
import DefaultUserImg from '../images/user.png';
import { Col } from "reactstrap";
import { cpus } from 'os';


const UserAside = ({profileImage, username}) => {
  return (
    <Col lg={{size: 3, offset: 1}}>
      <aside>
        <div className="panel panel-default">
          <div className="panel-body">
            <img
              src={profileImage || DefaultUserImg}
              alt={username}
              className="img-thumbnail"
              width="160"
              height="150"
            />
          </div>
        </div>
      </aside>
    </Col>
  );
}

export default UserAside;