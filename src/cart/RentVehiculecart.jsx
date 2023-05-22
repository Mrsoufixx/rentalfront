import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import SERVER_URL from "../../config";
import { UserContext } from "../../App";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51N8qcGI9A3IIVKKqEtSbn66kt6bXPhXYg4ZyvemGlo7MGM83CXbnoRZep2xVY7g8qXCLyPOPK87H4Ymb7UYYzSQ300GygYbQqo"
);

const Rentvehiculecart = () => {
  const { state, dispatch } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
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

  items.map((items) => {
    itemsPrice = items.totalbill;
    idOfRentedvehicule = items.rentvehiculeid;
    reqHours = items.requiredhours;
  });

  const handlePayMethod = async (e, itemsPrice, token) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const response = await fetch(SERVER_URL + "/stripePay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.id,
        amount: itemsPrice,
        idRentedvehicule: idOfRentedvehicule,
        hoursRequired: reqHours,
      }),
    });
    const data = await response.json();
    const clientSecret = data.clientSecret;

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (paymentMethodReq.error) {
      console.log(paymentMethodReq.error);
    } else {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (error) {
        console.log(error);
      } else {
        console.log(paymentIntent); // Payment successful
      }
    }
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
      <div className="salecartMaindiv">
        <div
          style={{
            marginTop: "150px",
          }}
        >
          {items.map((items) => (
            <div className="salecartLidiv" key={items._id}>
              <ul>
                <li style={{ wordSpacing: "10px" }}>
                  Brand: {items.brand} --- Model: {items.model} --- Hours:{" "}
                  {items.requiredhours} --- RentPerHour: {items.rentperhour}MAD
                  --- TotalBill: {items.totalbill}MAD{" "}
                  <button className="btn">
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          ))}
          <div style={{ padding: "30px", textAlign: "center" }}>
            <h2>Pay Through Credit / Debit vehiculed</h2>
            <br />
            <Stripe>
              <form onSubmit={handleSubmit} token={tokenHandler}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                  Pay
                </button>
                s
              </form>
            </Stripe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rentvehiculecart;
