import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Register />
    {/* <Login /> */}
  </React.StrictMode>
);
