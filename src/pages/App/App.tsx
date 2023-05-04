import { useEffect, useState } from "react";
import "./App.scss";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  avatarUrl: string;
  creationDate: Date;
}

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/user/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          avatarUrl: data.avatarUrl,
          creationDate: data.creationDate,
        });
      });
    setLoading(false);
  }, []);

  const disconnect = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div id="app" className="screen">
      {loading && <FullScreenLoader text="Chargement de la carte" />}
      <div className="screen__container">
        <p>Connecté en tant que : {user?.username}</p>
        <BoutonDefault text="Se deconnecter" onClick={disconnect} />
        <div className="screen__container__infos">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default App;
