import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../../config";
import HeaderDash from '../layouts/HeaderDash';




const AddVehicules = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [car, setCar] = useState({
    type:"",
    brand: "",
    model: "",
    year: "",
    color: "",
    enginecc: "",
    maxpower: "",
    airbags: "",
    rearcamera: "",
    price: "",
    retailprice: "",
    quantity: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCar((prevvehicule) => ({ ...prevvehicule, [name]: value }));
  };

  const handleFile = (e) => {
    const myfile = e.target.files[0];
    setFile(myfile);
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(car).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('wheelsImage', file);

    try {
      const res = await fetch(`${SERVER_URL}/addvehicules`, {
        method: "POST",
        body: formData
      });
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [rentFile, setRentFile] = useState(null);
  const [vehicule, setVehicule] = useState({
    type: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    seats: "",
    price: "",
    rent: ""
  });

  const handleRentInputs = (e) => {
    const { name, value } = e.target;
    setVehicule((prevvehicule) => ({ ...prevvehicule, [name]: value }));
  };

  const handleRentFile = (e) => {
    const myrentfile = e.target.files[0];
    setRentFile(myrentfile);
  };
  const postRentData = async (e) => {
    e.preventDefault();
    const rentData = new FormData();
    Object.entries(vehicule).forEach(([key, value]) => {
      rentData.append(key, value);
    });
    rentData.append('wheelsImage', rentFile);

    try {
      const res = await fetch(`${SERVER_URL}/addvehicules`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
        },
        body: rentData
      });
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };
    return (
        <>



  <section className="home-section">
  {/* <HeaderDash /> */}
    <div className="home-content">
      <div className="sales-boxes">
        {/* Rent File */}
        <div className="recent-sales box">
        <h1 className="heading text-6xl"><span>Add vehicules For Rent</span></h1>
      
        <form method="POST" className="addvehiculeform" name="vehiculeform" id="myrentform">

            <label htmlFor="type">Type: </label>
            <select name="type" id="type" value={vehicule.type} onChange={handleRentInputs}>
              <option value="Choisir votre type">Choisir votre type</option>
              <option value="Camion">Camion</option>
              <option value="voiture">Voiture</option>
              <option value="motos">Motos</option>
              <option value="velo">Vélo</option>
            </select>
            
            <label htmlFor="brand">Brand: </label>
            <input type="text" name="brand" id="brand" value={vehicule.brand} onChange={handleRentInputs} placeholder="Enter vehicule Brand"/><br />
            <label htmlFor="model">Model: </label>
            <input type="text" name="model" id="model" value={vehicule.model} onChange={handleRentInputs} placeholder="Enter vehicule Model" /><br />
            <label htmlFor="year">Year: </label>
            <input type="text" name="year" id="year" value={vehicule.year} onChange={handleRentInputs} placeholder="Manufacturing Year"/><br />
            <label htmlFor="color">Color: </label>
            <input type="text" name="color" id="color" value={vehicule.color} onChange={handleRentInputs} placeholder="Enter vehicule Color" /><br />
            <label htmlFor="seats">Seats: </label>
            <input type="text" name="seats" id="seats" value={vehicule.seats} onChange={handleRentInputs} placeholder="Enter vehicule Seats" /><br />
            <label htmlFor="price">Price: </label>
            <input type="text" name="price" id="price" value={vehicule.price} onChange={handleRentInputs} placeholder="Enter vehicule price" /><br />
            <label htmlFor="rent">Rent: </label>
            <input type="text" name="rent" id="rent" value={vehicule.rent} onChange={handleRentInputs} placeholder="Enter rent per hour" /><br />
            <label htmlFor="image">Picture: </label>
<input type="file" name="wheelsImage" id="image" onChange={handleRentFile} />

            <div className="button">
                <input type="submit" name="submit" onClick={postRentData}/>
            </div>
            </form>
          
        </div>
      </div>
    </div>
  </section>
        </>
    )
}

export default AddVehicules
