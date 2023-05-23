import React from "react";
import Review from "../components/Review";
import { FaUser } from 'react-icons/fa';
import { reviews } from "../../context/ReviewsData";
import "../styles/services.css"
function Services() {
  
  return (
    <section className="services my-20" id="services">
      <h1 className="mb-28 text-center font-semibold text-6xl">
        {" "}
        Nos clients <span>Pensées</span>{" "}
      </h1>

      <div className="box-container mb-10">
        {reviews.map((rev,index)=>(
            <Review key={index} image={rev.image} name={rev.name} description={rev.description}/>
        ))}
        
      </div>
    </section>
  );
}

export default Services;
