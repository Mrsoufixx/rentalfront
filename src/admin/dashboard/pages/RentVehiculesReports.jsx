import React, { useState, useEffect, useContext } from "react";

import SERVER_URL from "../../../config";
import HeaderDash from "../layouts/HeaderDash";



const Rentvehiculereports = () => {
  

  const [income, setIncome] = useState([]);
  let allsoldItems = [];

  const getrentvehiculeincome = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getrentvehiculeincome", {
        method: "GET",
      });

      const data = await res.json();

      setIncome(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrentvehiculeincome();
  }, []);

  income.map((income) => {
    income.soldItems.map((soldItems) => {
      allsoldItems.push(soldItems);
    });
  });
  const menutab = [
    "N°",
    "Marque",
    "model",
    "detail",
    "louée/Jour",
    "revenue",
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
                  Rapport des revenus
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
                  {allsoldItems.map((allsoldItems, index) => (
                    <tr
                      key={index}
                      class="text-gray-600 hover:bg-indigo-100/20 hover:text-gray-900"
                    >
                      <th class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4  ">
                        {index + 1}
                      </th>
                      <td class=" border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4 ">
                      {allsoldItems.brand}
                      </td>
                      <td class="text-start border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {allsoldItems.model}
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {allsoldItems.retailPricePerItem} MAD
                      </td>
                      <td class="text-center border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                      {allsoldItems.bookedHours}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xl whitespace-wrap p-4">
                      {allsoldItems.totalIncome} MAD
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

export default Rentvehiculereports;
