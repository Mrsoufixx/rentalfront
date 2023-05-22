import React, { useEffect, useContext, useState } from "react";
import SERVER_URL from "../../../config";

import { AdminContext } from "../../../App";
import HeaderDash from "../layouts/HeaderDash";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ cars }) => {
  const { AdminState, dispatchadmin } = useContext(AdminContext);
  const [getUser, setGetUsers] = useState([]);
  const [getVehicules, setGetVehicules] = useState([]);
  const navigate = useNavigate();

  const getallusers = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getavailableusers", {
        method: "GET",
      });

      const data = await res.json();
      setGetUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallusers();
  }, []);

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

  const data = [
    {
      name: "Mes voitures",
      value: getVehicules.length,
    },
    {
      name: "Mes utilisateurs",
      value: getUser.length,
    },
    {
      name: "Louées",
      value: getVehicules.length,
    },
    {
      name: "Revenues",
      value: `${getVehicules.length} MAD`,
    },
  ];

  const menutab = ["N°", "nom complet", "Model", "Nombre de jours", "revenus","Date retour"];
  return (
    <>
      <section className="home-section">
        <HeaderDash />
        <div className="home-content" style={{ textAlign: "center" }}>
          {/* <!-- component --> */}
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="relative bg-white px-4 py-4 rounded-3xl border-b-4 border-x-2 w-80 h-60 shadow-xl hover:-translate-y-2 ease-in duration-200"
                >
                  <div className="mt-4">
                    <p className="text-2xl font-semibold mb-4">{item.name}</p>
                    <div className="border-t-2 mb-8 "></div>
                    <div className="flex-col text-gray-400 text-center items-center text-6xl my-1 hover:text-gray-600">
                      <div className="my-3">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div class="relative flex flex-col min-w-0 my-20 lg:mb-0 break-words bg-white  w-full shadow-lg rounded-xl border-b-4">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-center text-4xl py-5 text-gray-900 0">
                  Emprunteurs Actuels
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
                  {/* {getUsers.map((getUser, index) => ( */}
                    <tr
                      
                      class="text-gray-600 hover:bg-indigo-100/20 hover:text-gray-900"
                    >
                      <th class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4  ">
                        
                      </th>
                      <td class=" border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4 ">
                        
                      </td>
                      <td class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                        
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                        
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4">
                       
                      </td>
                    </tr>
                  {/* // ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
