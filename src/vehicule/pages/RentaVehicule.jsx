import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../../config";
import { UserContext } from "../../App";
import Navbar from "../../layouts/NavBar";

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
      <div className="flex mt-40 justify-between mx-[10%]">
        <div className="w-9/12">
          <input
            type="text"
            name="name"
            placeholder="Search vehicule"
            style={{ width: "30%", height: "8%" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="btn"
          />
          <button type="submit" onClick={searchTextBtn} className="btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="w-3/12">
          <select name="categoris">
            <option value="voitures">Voitures</option>
            <option value="camions">Camions</option>
            <option value="velo">Vélo</option>
            <option value="motos">Motos</option>
          </select>
        </div>
      </div>
      <div className="rentvehiculevehiculed ">
        {rentVehiculesData.map((rentvehiculesData, index) => [
          <div className="vehiculedivRentvehicule" key={rentvehiculesData._id}>
            <img
              src={`http://localhost:5000/${rentvehiculesData.filePath}`}
              alt=""
            />

            <p>{rentvehiculesData.model}</p>
            <h4>{rentvehiculesData.brand}</h4>

            <div className="" key={index}>
              <form method="POST">
                <input
                  type="number"
                  className="vehiculedbtn"
                  name="rentforhours"
                  defaultValue={rentHours[index]}
                  onChange={(e) => handleInputs(index, e)}
                  placeholder="Enter rent hours"
                />

                <br />
                <button
                  type="submit"
                  className="vehiculedbtn"
                  onClick={(e) =>
                    proceedToCart(
                      rentvehiculesData._id,
                      rentHours[index],
                      index,
                      e
                    )
                  }
                >
                  Proceed
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
