import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../../config";
import { UserContext } from "../../App";
import Navbar from "../../layouts/NavBar";
import { FaCartPlus, FaSearch } from "react-icons/fa";

const Rentavehicule = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const [rentVehiculesData, setRentVehiculesData] = useState([]);

  const allRentVehicules = async () => {
    try {
      if (!state) {
        window.alert("Please signin to see all available vehicules for rent!");
        navigate("/signin");
      }

      const res = await fetch(SERVER_URL + "/getRentVehiculeData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
      });

      const data = await res.json();
      setRentVehiculesData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allRentVehicules();
  }, []);

  const [rentHours, setRentHours] = useState([]);

  const handleInputs = (index, e) => {
    const value = e.target.value;
    setRentHours((prevState) => {
      const updatedHours = [...prevState];
      updatedHours[index] = value;
      return updatedHours;
    });
  };
  useEffect(() => {
    if (rentVehiculesData.length > 0) {
      setRentHours(Array(rentVehiculesData.length).fill(0));
    }
  }, [rentVehiculesData]);

  const proceedToCart = async (itemId, rentHours, index, e) => {
    e.preventDefault();
    try {
      const res = await fetch(SERVER_URL + "/addtocartvehicule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
        body: JSON.stringify({
          itemId,
          rentHours,
        }),
      });

      const data = await res.json();

      if (res.status === 500 || !data) {
        window.alert("Something went wrong");
      } else if (res.status === 400) {
        window.alert("Item is already in the cart");
      } else if (res.status === 401) {
        window.alert("Please sign in to add items to the cart");
      } else if (res.status === 200) {
        window.alert(
          "Item added. Please click on Go To cart to complete the purchase"
        );
        setRentHours((prevState) => {
          const updatedHours = [...prevState];
          updatedHours[index] = 0; // Reset the input value to 0
          return updatedHours;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");

  const searchTextBtn = async () => {
    const res = await fetch(SERVER_URL + "/searchRentvehicule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchText,
      }),
    });

    getSearchData();
  };

  const getSearchData = async () => {
    try {
      const res = await fetch(SERVER_URL + "/rentvehiculesearchCategory", {
        method: "GET",
      });

      const data = await res.json();
      setRentVehiculesData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex mt-40 justify-between items-center mx-[10%]">
        <div className="w-9/12 flex gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="rechercher par marque ou model que vous voulez "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="btn shadow-md shadow-[#d4d7db]"
          />
          <button type="submit" onClick={searchTextBtn} className="btn flex justify-center items-center bg-[#393E46] shadow-md shadow-[#d4d7db]">
            <FaSearch style={{fill:"#eee"}}/>
          </button>
        </div>
        <div className="w-3/12 flex justify-end">
          <select name="categoris " className="h-12 rounded-md shadow-md shadow-[#d4d7db] px-6 text-xl ">
            <option value="voitures">Voitures</option>
            <option value="camions">Camions</option>
            <option value="velo">Vélo</option>
            <option value="motos">Motos</option>
          </select>
        </div>
      </div>
      <div className="rentvehiculevehiculed my-4">
        {rentVehiculesData.map((rentvehiculesData, index) => [
          <div className="vehiculedivRentvehicule" key={rentvehiculesData._id}>
            <img
              src={`http://localhost:5000/${rentvehiculesData.filePath}`}
              alt=""
            />

            <p className="mt-8 text-2xl ">{rentvehiculesData.model}</p>
            <h4 className="text-4xl font-semibold my-4">{rentvehiculesData.brand}</h4>

            <div className="w-full" key={index}>
              <form method="POST">
                <div className="flex items-center justify-between text-xl w-full">
                  <div className="w-5/6 flex justify-start align-baseline ">
                  <span className="text-6xl font-bold ">{rentvehiculesData.rent}</span> MAD/Jour
                  </div>
                <input
                  type="number"
                  className="w-1/6 text-center"
                  name="rentforhours"
                  defaultValue={rentHours[index]}
                  onChange={(e) => handleInputs(index, e)}
                  placeholder="Entrer le nombre de jours"
                />
                </div>
              
                <button
                  type="submit"
                  className="btn bg-[#00ADB5] text-[#eee] text-xl hover:bg-[#0b5b5f] w-full flex justify-center gap-8"
                  onClick={(e) =>
                    proceedToCart(
                      rentvehiculesData._id,
                      rentHours[index],
                      index,
                      e
                    )
                  } 
                >
                  Ajouter dans Panier
                  <FaCartPlus size={18}/>
                </button>
              </form>
            </div>
          </div>,
        ])}
      </div>
    </>
  );
};

export default Rentavehicule;
