import "./Home.css";
import MapScreen from "../../assets/mapscreen.png";
import Logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className="screen">
      <div className="container">
        <div className="flex-row gb">
          <div className="left">
            <img src={Logo} alt="Logo de Pin Earth Better - PEB" />
            <div className="text">
              <h1>
                Ne perdez plus jamais <strong>une bonne addresse</strong>
              </h1>
              <p>
                Ce site va changer votre facon de découvrir les villes de France
                et de partager vos bon plans avec vos amis.
              </p>
            </div>
            <div className="flex-row">
              <button className="button accent">Connexion</button>
              <button className="button default">Inscription</button>
            </div>
          </div>
          <div className="right">
            <img src={MapScreen} alt="Map" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
