import React, { useState, useEffect, useContext } from "react";
import SERVER_URL from "../config";
import Stripe from "react-stripe-checkout";
import Navbar from "../layouts/Navbar";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom/dist";

const Mycart = () => {
  const [cartUser, setCartUser] = useState([]);
  const [items, setItems] = useState([]);

  let itemsPrice, idOfRentedvehicule, reqHours;

  const getCartData = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getCartData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
      });

      const data = await res.json();
      setCartUser(data.userById);
      setItems(data.cartItems);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  items?.map((item) => {
    itemsPrice = item.totalbill;
    idOfRentedvehicule = item.rentvehiculeid;
    reqHours = item.requiredhours;
  });

  const handlePayMethod = (itemsPrice, token) => {
    return fetch(SERVER_URL + "/stripePay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.id,
        amount: itemsPrice,
      }),
    });
  };

  const tokenHandler = (token) => {
    handlePayMethod(itemsPrice, token);
    updateDataBase();
  };

  const updateDataBase = () => {
    return fetch(SERVER_URL + "/updateDataBase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    });
  };

  const deleteItem = async (e) => {
    const cartitemid = e.currentTarget.id;
    // console.log(cartitemid);
  
    try {
      const response = await fetch(SERVER_URL + "/deleteitemfromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
        body: JSON.stringify({
          cartitemid: cartitemid,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Vehicle deleted successfully
        console.log(data.message); // Display the success message
        getCartData(); // Fetch updated cart data and re-render the page
      } else {
        // Error deleting vehicle
        console.log(data.error); // Display the error message
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-52">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Ma panier</h1>
              <h2 className="font-semibold text-2xl">
                {items ? `${items.length} Vehicules` : "0 Vehicules"}
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xl uppercase w-2/5">
                Details du produits
              </h3>
              <h3 className="font-semibold  text-gray-600 text-xl uppercase w-1/5 text-center">
                Nombre de jours
              </h3>
              <h3 className="font-semibold  text-gray-600 text-xl uppercase w-1/5 text-center">
                Prix/jour
              </h3>
              <h3 className="font-semibold  text-gray-600 text-xl uppercase w-1/5 text-center">
                Prix Total
              </h3>
            </div>

            {items && items.length ? (
              items.map((item,index) => (
                <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={`${SERVER_URL}/${item.imageSrc}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.model}</span>
                      <span className="text-red-500 text-xs">{item.brand}</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <input
  className="mx-2 border text-center w-8"
  type="text"
  value="1"
  onChange={(e) => {}}
/>

                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {item.rentperhour} MAD
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {item.totalbill} MAD
                  </span>
                  <button id={item._id} onClick={deleteItem} className="">
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-6xl flex justify-center items-center">
                Votre panier est vide.
              </p> // Display this message if cart is empty
            )}
            <Link
              href="#"
              className="flex items-center font-semibold text-indigo-600 text-sm mt-10"
            >
              <FaArrowLeft
                size={10}
                className="fill-current mr-2 text-indigo-600 w-4"
              />
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">590$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>

            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Prix Total</span>
                <span>$600</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Payement
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>Pay Through Credit / Debit vehiculed</h2>
        <br />
        <Stripe
          stripeKey="pk_test_51Jyb5UBvc4Qazj8jy6qimLop4epxe5jziUD3ixj5ISycjjD6yYVGZhk688Pz9Lna32VTHbSHxRwkrvNNnnnr96P000M68u5jcd"
          token={tokenHandler}
        />
      </div>
    </>
  );
};

export default Mycart;
