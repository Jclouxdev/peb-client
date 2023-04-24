import {Routes,BrowserRouter as Router,Route} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Acceuil from "./Acceuil/Acceuil";


function Routing() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Acceuil />}/>
        </Routes>
      </Router>
  );
}

export default Routing;