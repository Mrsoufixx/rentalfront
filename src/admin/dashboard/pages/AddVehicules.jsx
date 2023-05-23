import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../../config";
import HeaderDash from "../layouts/HeaderDash";

const AddVehicules = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [car, setCar] = useState({
    type: "",
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
    quantity: "",
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
    formData.append("wheelsImage", file);

    try {
      const res = await fetch(`${SERVER_URL}/addvehicules`, {
        method: "POST",
        body: formData,
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
    rent: "",
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
    rentData.append("wheelsImage", rentFile);

    try {
      const res = await fetch(`${SERVER_URL}/addvehicules`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
        },
        body: rentData,
      });
      // Handle response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <section className="home-section">
        <HeaderDash />
        <div class="relative flex flex-col min-w-0 my-40 lg:mb-0 break-words bg-white  w-full shadow-lg rounded-xl border-b-4">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-center text-4xl py-5 text-gray-900 0">
                  L'ajout des vehicules
                </h3>
              </div>
            </div>
            <hr className="mx-20 h-px bg-slate-500 text-center felx justify-center" />
            <div class="block w-full overflow-x-auto">
              <div className="py-8 px-20">
                <form
                  method="POST"
                  className="addvehiculeform flex flex-col"
                  name="vehiculeform"
                  id="myrentform"
                >
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="type">Type: </label>
                    <select
                      name="type"
                      id="type"
                      value={vehicule.type}
                      onChange={handleRentInputs}
                    >
                      <option value="Choisir votre type">
                        Choisir votre type
                      </option>
                      <option value="Camion">Camion</option>
                      <option value="voiture">Voiture</option>
                      <option value="motos">Motos</option>
                      <option value="velo">Vélo</option>
                    </select>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="brand">Marque: </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={vehicule.brand}
                      onChange={handleRentInputs}
                      placeholder="Entrer la marque de la voiture"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="model">Model: </label>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      value={vehicule.model}
                      onChange={handleRentInputs}
                      placeholder="Entrer le model de voiture"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="year">Année de fabrication: </label>
                    <input
                      type="text"
                      name="year"
                      id="year"
                      value={vehicule.year}
                      onChange={handleRentInputs}
                      placeholder="Ecrire l'année de fabrication"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="color">Couleur: </label>
                    <input
                      type="text"
                      name="color"
                      id="color"
                      value={vehicule.color}
                      onChange={handleRentInputs}
                      placeholder="Entrer le couleur de votre voiture"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="seats">Chaise: </label>
                    <input
                      type="text"
                      name="seats"
                      id="seats"
                      value={vehicule.seats}
                      onChange={handleRentInputs}
                      placeholder="Entrer le nombre de chaise"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="price">Prix: </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={vehicule.price}
                      onChange={handleRentInputs}
                      placeholder="entrer le prix de la voiture"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="rent">Prix/jour: </label>
                    <input
                      type="text"
                      name="rent"
                      id="rent"
                      value={vehicule.rent}
                      onChange={handleRentInputs}
                      placeholder="Entrer le prix de location par jour"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <label htmlFor="image">Image: </label>
                    <input
                      type="file"
                      name="wheelsImage"
                      id="image"
                      onChange={handleRentFile}
                    />
                  </div>

                  <div className="button">
                    <input type="submit" name="submit" onClick={postRentData} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddVehicules;
