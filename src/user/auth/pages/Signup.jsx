import React, { useState } from "react";
import "../registerStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../../config";
import Navbar from "../../../layouts/NavBar";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    cPassword: "",
    avatar: "/default_avatar.png",
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, cPassword,avatar} = user;

    try {
      const res = await axios.post(SERVER_URL + "/signup", {
        firstName,
        lastName,
        email,
        password,
        cPassword,
        avatar
      });

      const data = res.data;

      if (data.status === 422 || !data) {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Registration successful");
        console.log("Registration successful");

        navigate("/"); // Redirect to the user info page for editing the profile
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
     <Navbar />
      <div className="maincontainer">
        <div className="firstcontainer">
          <div className="titled "></div>
          <div className="content">
            <h2 className="text-center text-3xl font-bold">Registration</h2>
            <form method="POST " className="mt-20">
              <div className="user-details">
                <div className="input-box">
                <label className="details">Nom</label>
  <input
    type="text"
    name="lastName" // Corrected spelling of "lastName"
    id="lastname"
    value={user.lastName}
    onChange={handleInputs}
    placeholder="Entrer votre Nom"
    required
  />
</div>
<div className="input-box">
  <label className="details">Prenom</label>
  <input
    type="text"
    name="firstName" // Corrected spelling of "firstName"
    id="firstname"
    value={user.firstName}
    onChange={handleInputs}
    placeholder="Entrer votre Prenom"
    required
  />
</div>
                <div className="input-box">
                  <label className="details">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Entrer votre Email"
                   
                  />
                </div>
                <div className="input-box">
                  <label className="details">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="************"
                    required
                  />
                </div>
                <div className="input-box">
                  <label className="details">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    value={user.cPassword}
                    onChange={handleInputs}
                    placeholder="Confirmer ************"
                    required
                  />
                </div>
              </div>
              <div className="button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  value="register"
                  onClick={postData}
                />
              </div>
            </form>
            <div className='flex justify-between'>
                            <h3> Vous avez déja un compte ? <Link style={{color: "#00ADB5"}} to="/signin">Se connecter</Link></h3>
                            
                            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
