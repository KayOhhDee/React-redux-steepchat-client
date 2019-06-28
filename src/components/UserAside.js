import React from 'react';
import DefaultUserImg from '../images/user.png';

const UserAside = ({profileImage, username}) => {
  return(
    <aside className="col-sm-2">
     <div className="panel panel-default">
      <div className="panel-body">
        <img 
          src={profileImage || DefaultUserImg} 
          alt={username} 
          className="img-thumbnail"
          width="150"
          height="150"
        />
      </div>
     </div>
    </aside>
  )
}

export default UserAside;