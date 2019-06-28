import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="hero">
        <div className="hero-content-area">
          <h1>What&apos;s Trending?</h1>
          <h3>
            Want to <span>SteepChat?</span>
          </h3>
          <Link to="/signup" className="btn">
            Get Started!
          </Link>
        </div>
      </div>
    );
  }
  return(
    <h1>You,ve logged in successfully</h1>
  )
}

export default Homepage;