import React from "react";
import Review from "../components/Review";
import { FaUser } from 'react-icons/fa';
import { reviews } from "../../context/ReviewsData";
import "../styles/review.css"
function Services() {
  
  return (
    <section className="services" id="services">
      <h1 className="heading">
        {" "}
        Our Customers <span>Thoughts</span>{" "}
      </h1>

      <div className="box-container">
        {reviews.map((rev,index)=>(
            <Review key={index} image={rev.image} name={rev.name} description={rev.description}/>
        ))}
        
      </div>
    </section>
  );
}

export default Services;
