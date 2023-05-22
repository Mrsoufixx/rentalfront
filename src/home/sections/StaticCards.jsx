import React from 'react';
import Card from '../components/Card';
import { FaBiking, FaUsers, FaMotorcycle } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { MdCarRental } from 'react-icons/md';


import "../styles/staticCard.css"

function StaticCards() {
  const cardData = [
    { name: 'Vehicules Louée', value: '30', icon: MdCarRental },
    { name: 'Client Satisfait', value: '12', icon: FaUsers },
    { name: 'Vehicules Dispo', value: '21', icon: AiFillCar },
  ];

  return (
    <section className="icons-container">
      {cardData.map((card, index) => (
        <Card key={index} name={card.name} value={card.value} icon={card.icon} />
      ))}
    </section>
  );
}

export default StaticCards;
