import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>    
      <App />
    </BrowserRouter>
);
