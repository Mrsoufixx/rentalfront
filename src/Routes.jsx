import { Route, Routes } from "react-router-dom";
import React from "react";
const Home = React.lazy(()=> import("./home/Home"));
const Signin = React.lazy(()=> import("./user/auth/pages/Signin"));
const Signup = React.lazy(()=> import("./user/auth/pages/Signup"));
const Signout = React.lazy(()=> import("./user/auth/pages/Signout"));
const Mycart = React.lazy(()=> import("./cart/Mycart"));
const RentaVehicule = React.lazy(()=> import("./vehicule/pages/RentaVehicule"));
// const Rentvehiculecart = React.lazy(()=> import("./cart/RentVehiculecart"));
const RentVehiculeReviews = React.lazy(()=> import("./vehicule/pages/RentVehiculeReviews"));
import Spinner from './reusable/Spinner';



function UserRoutes() {
  return (
    <React.Suspense fallback={<Spinner />}>
     
        <Routes>
          {" "}
          {/* wrap all Route components inside Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/rentavehicule/" element={<RentaVehicule />} />
          {/* <Route path="/rentvehiculecart" element={<Rentvehiculecart />} /> */}
          <Route path="/rentvehiculereviews" element={<RentVehiculeReviews />} />
          <Route path="/mycart" element={<Mycart />} />
          
        </Routes>
    
    </React.Suspense>
  );
}

export default UserRoutes;
