import React, { useState, useEffect, useContext } from "react";
import SERVER_URL from "../config";
import Stripe from "react-stripe-checkout";

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

  let cartitemid;
  const deleteItem = (e) => {
    cartitemid = e.target.id;
    return fetch(SERVER_URL + "/deleteitemfromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
      },
      body: JSON.stringify({
        cartitemid,
      }),
    });
  };

  return (
    <>
      <div className="salecartMaindiv h-[50vw]">
        <div
          style={{
            marginTop: "150px",
          }}
        >
          {items && items.length ? (
            items.map((item) => (
              <div className="salecartLidiv" key={item._id}>
                <ul>
                  <li style={{ wordSpacing: "10px" }}>
                    Brand: {item.brand} --- Model: {item.model} --- Hours:{" "}
                    {item.requiredhours} --- Price: {item.totalbill} MAD{" "}
                    <button id={item._id} onClick={deleteItem} className="btn">
                      <i className="fa fa-trash"></i>
                    </button>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>Votre panier est vide.</p> // Display this message if cart is empty
          )}
          <div style={{ padding: "30px", textAlign: "center" }}>
            <h2>Pay Through Credit / Debit vehiculed</h2>
            <br />
            <Stripe
              stripeKey="pk_test_51Jyb5UBvc4Qazj8jy6qimLop4epxe5jziUD3ixj5ISycjjD6yYVGZhk688Pz9Lna32VTHbSHxRwkrvNNnnnr96P000M68u5jcd"
              token={tokenHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mycart;
