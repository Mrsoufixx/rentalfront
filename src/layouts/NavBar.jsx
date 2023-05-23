import React, { useContext, useState, useEffect } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import SERVER_URL from "../config";
import { HiBars3, HiOutlineUserCircle } from "react-icons/hi2";
import logo from "../assets/logo.svg";
import "./styles/navbar.css";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cartData, setCartData] = useState([]);

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
      const res = await axios.get(SERVER_URL + "/getdata", {
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
      setFirstName(data.firstName);

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

  const getCartData = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getCartData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
        },
      });

      const data = await res.json();
      setCartData(data.userById);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderAuthOptions = () => {
    return (
      <>
        <li className="hover:bg-slate-50 px-6 p-2">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="hover:bg-slate-50 px-6 p-2">
          <Link to="/reservation">Reservation</Link>
        </li>
        <li className="hover:bg-slate-50 px-6 p-2">
          <Link to="/signout">Logout</Link>
        </li>
      </>
    );
  };
  const location = useLocation();

  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/rentavehicule", label: "Catalogue" },
    { to: "/about", label: "à propos" },
    { to: "/contact", label: "Contactez-nous" },
  ];
  return (
    <header className={`header ${scrollPosition > 0 ? "shadow-lg" : ""}`}>
      <div id="menu-btn" className="cursor-pointer">
        <HiBars3 />
      </div>

      <Link className="logo flex items-center " to="/">
        <img src={logo} alt="logo" className="w-24 mr-4" />
        <span className="text-[#00ADB5]">MobiLoc</span>
      </Link>

      <nav className="navbar">
        {menuLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`menu-link ${
              location.pathname === link.to ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div id="login-btn">
        {state ? (
          <div className="relative dropdown flex items-center gap-4">
            <div className="relative flex mr-10">
              {" "}
              <Link to="/mycart">
                <IoCarSportOutline size={23} className="text-[#393E46]" />

                <span className="absolute bg-red-500 -top-3 text-center w-6 h-6 p-0.5 text-white rounded-full">
                  0
                </span>
              </Link>
            </div>

            <div
              className="cursor-pointer text-2xl flex items-center gap-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              <HiOutlineUserCircle size={20} className="text-[#393E46]"/>
              {firstName}
              <FaChevronDown className="text-[#393E46]"/>
            </div>
            {showMenu && (
              <ul className="absolute bg-white top-12 left-28 text-xl leading-9 rounded shadow-md">
                {renderAuthOptions()}
              </ul>
            )}
          </div>
        ) : (
          <div>
            <Link
              className="btn  text-[#222831] hover:text-[#00ADB5]"
              to="/signin"
            >
              Connecter
            </Link>
            <Link
              className="btn bg-[#222831] hover:bg-[#00ADB5] text-[#EEEEEE]"
              to="/signup "
            >
              Inscrire
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
