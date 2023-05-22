import React, { useEffect, useContext } from "react";
import "./dashboard.css";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SERVER_URL from "../../config";
import { AdminContext } from "../../App";
import SideBar from "./layouts/SideBar";
import Dashboard from "./pages/Dashboard";
import Availableusers from "./pages/Availableusers";
import GetVehicules from "./pages/GetVehicules";
import AddVehicules from "./pages/AddVehicules";
import RentVehiculesReports from "./pages/RentVehiculesReports"


const DashboardRoutes = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const callDashboard = async () => {
    try {
      const res = await fetch(SERVER_URL + "/getadmindata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtAdmin") || ""}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      // navigate("/dashboard");
    }
  };

  useEffect(() => {
    callDashboard();
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/");
    }
  }, [adminState, navigate]);

  return (
    <>
      
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<Dashboard  />}
        />
        <Route
          path="/addvehicules"
          element={<AddVehicules  />}
        />
        <Route
          path="/vehiculesreports"
          element={<RentVehiculesReports  />}
        />
        <Route
          path="/getvehicules"
          element={<GetVehicules />}
        />
        <Route
          path="/getusers"
          element={<Availableusers />}
        />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
