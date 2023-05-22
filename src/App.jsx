import React, { createContext, useReducer } from "react";

import { Routes, Route } from "react-router-dom"; // import Routes component
import "./css/App.css";
import UserRoutes from "./Routes";

import Dashboard from "./admin/dashboard/DashboardRoutes";
import AdminSignin from "./admin/auth/pages/AdminSignin";
import AdminSignout from "./admin/auth/pages/AdminSignout";

import { initialState, reducer } from "./reducer/UseReducer";
import { adminInitialState, adminreducer } from "./reducer/UseReducerAdmin";
import ScrollToTop from "./shared/ScrollToTop";
import UseScrollToTop from './hooks/useScrollToTop';
import Spinner from './reusable/Spinner';

export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [adminState, dispatchadmin] = useReducer(
    adminreducer,
    adminInitialState
  );
 
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
      <ScrollToTop />
        <UserRoutes />
        <UseScrollToTop />
      </UserContext.Provider>

      <AdminContext.Provider value={{ adminState, dispatchadmin }}>
      <React.Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignout" element={<AdminSignout />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        </React.Suspense>
      </AdminContext.Provider>
    </>
  );
};

export default App;

// import Navbar from "./layouts/Navbar";
// import Footer from "./layouts/Footer";

// import AdminSignin from "./admin/auth/pages/AdminSignin";
// import AdminSignout from "./admin/auth/pages/AdminSignout";
// import Availableusers from "./admin/dashboard/pages/Availableusers";

// const App = () => {

//   return (
//     <>
//
//       <Routes>
//         <Route path="/adminsignin" element={<AdminSignin />} />
//       </Routes>
//       <AdminContext.Provider value={{ adminState, dispatchAdmin }}>
//         <Routes>
//
//           <Route path="/availableusers" element={<Availableusers />} />
//         </Routes>
//       </AdminContext.Provider>
//     </>
//   );
// };

// export default App;
