import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SERVER_URL from "../../../config";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderDash from "../layouts/HeaderDash";

const GetVehicules = () => {
  const [getVehicules, setGetVehicules] = useState([]);

  const getallrenttVehicules = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getVehicules", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
        },
      });

      const data = await res.json();
      setGetVehicules(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallrenttVehicules();
  }, []);

  let vehiculeIdFromDashBoard;
  const deleteVehicule = (e) => {
    vehiculeIdFromDashBoard = e.currentTarget.id;
    console.log(vehiculeIdFromDashBoard);
    return fetch(SERVER_URL + "/deleteVehiculeDashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
      },
      body: JSON.stringify({
        vehiculeIdFromDashBoard,
      }),
    });
  };

  const menutab = [
    "N°",
    "Type",
    "Marque",
    "Model",
    "Image",
    "prix/Jour",
    "availability",
    "Action",
  ];
  return (
    <>
      <section className="home-section">
        <HeaderDash />
        <div class="relative flex flex-col min-w-0 my-40 lg:mb-0 break-words bg-white  w-full shadow-lg rounded-xl border-b-4">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-center text-4xl py-5 text-gray-900 0">
                  Les vehicules desponibles
                </h3>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    {menutab.map((menu, index) => (
                      <th
                        key={index}
                        class="px-4 bg-gray-50  text-gray-500 align-middle border border-solid border-gray-200  py-3 text-xl uppercase border-l-0 border-r-0 whitespace-wrap font-semibold text-left"
                      >
                        {menu}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getVehicules.map((getVehicule, index) => (
                    <tr
                      key={getVehicule._id}
                      class="text-gray-600 hover:bg-indigo-100/20 hover:text-gray-900"
                    >
                      <th class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4  ">
                        {index + 1}
                      </th>
                      <td class=" border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4 ">
                      {getVehicule.type}
                      </td>
                      <td class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {getVehicule.brand}
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {getVehicule.model}
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      <img 
                      className="w-60"
                      src={`http://localhost:5000/${getVehicule.filePath}`}
                      alt="teqt" />
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {getVehicule.rent}
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {getVehicule.availability}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4">
                        <div className="flex p-4 justify-between">
                          <button id={getVehicule._id} onClick={deleteVehicule}>
                            <FaTrash />
                          </button>

                          <button id={getVehicule._id}>
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetVehicules;
