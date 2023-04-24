import "./Login.css";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import Logo from "../../assets/logo.png";
import Illustration from "../../assets/undraw_absorbed_in_re_ymd6.svg";
import FormStatus from "../../components/FormStatus/FormStatus";

const Login = () => {
  return (
    <div className="screen center-flex">
      <div className="container flex-row">
        <div className="container__form">
          <img src={Logo} alt="Pin Earth Better Logo" className="logo" />
          <h1>Connectez-vous</h1>
          <div className="decorated-text">
            <p>Se connecter avec un email</p>
            <div className="hr"></div>
          </div>
          <FormStatus
            text="Inscription validée, connectez-vous"
            success={true}
          />
          <div className="container__form__input">
            <p>Adresse Email</p>
            <input type="email" name="email" placeholder="Adresse Email" />
          </div>
          <div className="container__form__input">
            <p>Mot de passe</p>
            <input type="password" name="password" placeholder="Mot de passe" />
          </div>
          <BoutonDefault text="Se connecter" />
          <div className="decorated-text margin-block">
            <p>Pas encore de compte ?</p>
            <div className="hr"></div>
          </div>
          <p className="link">
            Je m'<a href="#">inscrit</a>
          </p>
        </div>
        <div className="container__illustration center-flex">
          <img src={Illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
