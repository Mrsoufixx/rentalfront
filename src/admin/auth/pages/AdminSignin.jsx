import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../../../config";
import axios from "axios";
import "../registerStyleAdmin.css"
import { AdminContext } from "../../../App";

const AdminSignin = () => {
  
  const { adminState, dispatchadmin } = useContext(AdminContext);

  const adminNavigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const signinAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${SERVER_URL}/signinAdmin`,
        {
          adminName,
          adminPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
          },
          withCredentials: true,
        }
      );
      
      if (res.status === 200) {
          // localStorage.setItem("jwtoken", res.data.token);
          dispatchadmin({type: "ADMIN", payload:res.data.token})
        window.alert("Signin Successful");
        adminNavigate("/dashboard");
      } else {
        window.alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      window.alert("An error occurred");
    }
  };

  return (
    <>

    <div className="maincontainer m-0">
      <div className="firstcontainer">
        <div className="titled"></div>

        <div id="adminsignin" className="content">
          <h2 className='text-center text-3xl font-bold'>Connexion Admin</h2>
          <form method="POST" className=' mt-20'>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Nom</span>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter your user name"
                />
              </div>

              <div className="input-box">
                <span className="details">Mot de passe</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="signin" onClick={signinAdmin} />
            </div>
          </form>
          
            <Link className="text-start font-semibold text-[#393E46] " to="/signin">
              Se connecter en tant que' <span className="hover:text-[#00ADB5]"> Utilisateur </span>
            </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default AdminSignin;
