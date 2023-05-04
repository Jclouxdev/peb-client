import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import loadable from "@loadable/component";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/App/App";

const Home = loadable(() => import("./pages/Home/Home"));
const Register = loadable(() => import("./pages/Register/Register"));
const Login = loadable(() => import("./pages/Login/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
