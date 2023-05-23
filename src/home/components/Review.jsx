import React from 'react'

function Review({ name, image, description }) {
  return (
    <div className="box">
      <div className="rev-img mb-8">
        <img src={image} alt="" />
      </div>
      <h3 className='mb-4'>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Review