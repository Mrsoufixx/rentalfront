import React, { useContext, useState, useEffect } from "react";
import { IoCarSportOutline } from 'react-icons/io5'
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import SERVER_URL from "../config";
import { HiBars3 } from "react-icons/hi2"
import logo from "../assets/logo.svg"

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
 
  const [showMenu, setShowMenu] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const userContact = async () => {
    try {
      const res = await axios.get(SERVER_URL+"/getdata",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
        withCredentials: true,
      });

      const data = res.data;
      
      setUserData({
        ...userData,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
      });
      setFirstName(data.firstName)

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, [firstName]);

  // const getCartData = async () => {
  //   try {
  //     const res = await fetch(SERVER_URL + "/getCartData", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
  //       },
  //     });

  //     const data = await res.json();
  //     setCartUser(data.userById);
  //     setItems(data.cartItems);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCartData();
  // }, []);


  const renderAuthOptions = () => {
    return (
      <>
            <li>
              <Link to="/userinfo/profile">Profile</Link>
            </li>
            <li>
              <Link to="/userinfo/reservation">Reservation</Link>
            </li>
            <li>
              <Link to="/signout">Logout</Link>
            </li>
      </>
    );
  };

  return (
    <header className="header">
      <div id="menu-btn" className="cursor-pointer"><HiBars3 /></div>

      <Link className="logo flex items-center " to="/">
        <img src={logo} alt="logo" className="w-24 mr-4" /><span className="text-lteal">Loco</span>
      </Link>

      <nav className="navbar " >
        <Link to="/" className="hover:text-lteal">Home</Link>
        <Link to="/rentavehicule" className="hover:text-lteal">Catalogue</Link>
        <Link to="/rentavehicule" className="hover:text-lteal">Contactez-nous</Link>
      </nav>

      <div id="login-btn" >
        {state ? (
          <div className=" dropdown flex gap-4">
            <div className="relative flex mr-10"> <Link to="/mycart"><IoCarSportOutline size={30}/> <span className="absolute bg-red-500 -top-2 text-center w-6 h-6 p-0.5 text-white rounded-full">0</span></Link></div>
            <div className="cursor-pointer text-2xl flex items-center gap-2" onClick={() => setShowMenu(!showMenu)}>
              {/* <img src={userData.avatar} alt="avatar" /> */}
              {firstName}<FaChevronDown/>
            </div>
            {showMenu && (
              <ul className="absolute bg-white top-32 text-lg p-2 ">
                {renderAuthOptions()}
              </ul>
            )}
          </div>
        ) : (
          <div>
          <Link className="btn  text-ldark underline hover:text-lteal" to="/signin">
            Connecter
          </Link>
          <Link className="btn bg-ldark hover:bg-lteal text-lwhite" to="/signup ">
            Inscrire
          </Link>

          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
