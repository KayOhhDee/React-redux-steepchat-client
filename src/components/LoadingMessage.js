import React from 'react';
import DefaultUserImg from "../images/user.png";

const LoadingMessage = () => {

  let skeleton = Array.from({ length: 5 }).map((item, idx) => (
    <li key={idx} className="list-group-item">
      <div className="list-item-info">
        <img
          src={DefaultUserImg}
          alt="no-img"
          height="100"
          width="100"
          className="timeline-image"
        />
        <div className="message-area">
          <div
            style={{ width: "50px", height: "15px", marginTop: "7px",backgroundColor: "#8E54E9" }}
          />
          <div 
            style={{width: "70px", height: "10px", marginTop: "4px", backgroundColor: "rgba(0, 0, 0, 0.3)"}}
          />
        </div>
      </div>
      <div>
        <div className="post">
          <div style={{height: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", width: "90%", marginBottom: "10px"}} />
          <div style={{height: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", width: "90%", marginBottom: "10px"}} />
          <div style={{height: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", width: "50%", marginBottom: "10px"}} />
        </div>
      </div>
    </li>
  ));

    return (
      <div>
        {skeleton}
      </div>
    )
}

export default LoadingMessage
