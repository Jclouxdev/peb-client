import "./Register.css";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import Logo from "../../assets/logo.png";
import Illustration from "../../assets/undraw_absorbed_in_re_ymd6.svg";

const Register = () => {
  return (
    <div className="screen center-flex">
      <div className="container flex-row">
        <div className="container__form">
          <img src={Logo} alt="Pin Earth Better Logo" className="logo" />
          <h1>Inscrivez-vous</h1>
          <div className="decorated-text">
            <p>S'enregistrer avec un email</p>
            <div className="hr"></div>
          </div>
          <div className="container__form__input">
            <p>Nom d'utilisateur</p>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              required={true}
            />
          </div>
          <div className="container__form__input">
            <p>Adresse Email</p>
            <input
              type="email"
              name="email"
              placeholder="Adresse Email"
              required={true}
            />
          </div>
          <div className="container__form__input">
            <p>Mot de passe</p>
            <input type="password" name="password" placeholder="Mot de passe" />
          </div>
          <div className="container__form__input">
            <p>Confirmer le mot de passe</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Mot de passe"
              required={true}
            />
          </div>
          <div className="container__form__checkbox flex-row">
            <input
              type="checkbox"
              name="confirmPassword"
              placeholder="Mot de passe"
              required={true}
            />
            <p>J'accepte les CGU</p>
          </div>
          <BoutonDefault text="S'inscrire" />
          <div className="decorated-text margin-block">
            <p>Deja inscrit ?</p>
            <div className="hr"></div>
          </div>
          <p className="link">
            Je me <a href="#">connecte</a>
          </p>
        </div>
        <div className="container__illustration center-flex">
          <img src={Illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
