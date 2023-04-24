import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <Register />
    <Login /> */}
    <Home />
  </React.StrictMode>
);
