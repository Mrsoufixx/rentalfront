import React from 'react';


function Card({ name, value, icon }) {
  const Icon = icon;

  return (
    <div className="icons">
      
        <Icon size={40} className="i"/>
     
      <div className="content">
        <h3>{value}+</h3>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Card;
