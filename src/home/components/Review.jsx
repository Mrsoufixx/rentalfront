import React from 'react'

function Review({ name, image, description }) {
  return (
    <div className="box">
      <div className="rev-img">
        <img src={image} alt="" />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Review