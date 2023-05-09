import "./Register.css";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import Logo from "../../assets/logo.png";
import Illustration from "../../assets/undraw_absorbed_in_re_ymd6.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";

const schema = yup.object().shape({
  username: yup.string().min(2).max(20).required(),
  email: yup.string().email().min(5).max(40).required(),
  password: yup.string().min(8).max(30).required(),
  conscentCgu: yup.boolean().oneOf([true], "Ce champ est requis."),
  confirmPassword: yup
    .string()
    .min(8)
    .max(100)
    .oneOf([yup.ref("password")], "Les mots de passes ne sont pas identiques !")
    .required(),
});

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  let value = useWatch({
    control,
    name: ["username", "email", "password", "confirmPassword"],
  });

  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    reset();
    try {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const resultJson = await result.json();
      console.log(resultJson);

      setLoading(false);
      if (resultJson.statusCode == 500) {
        navigate("/login?success=false&error=duplicatedEmail");
      } else {
        navigate("/login?success=true");
      }
    } catch (error) {
      navigate("/login?success=false");
    }
  };

  const [usernameAvailable, setUsernameAvailable] = useState<
    boolean | undefined
  >();

  const handleBlur = async (event: any) => {
    event.preventDefault();
    if (value[0].length >= 2) {
      await fetch(`${import.meta.env.VITE_BASE_URL}/user/exist/${value[0]}`, {
        method: "GET",
        headers: { Authentification: "Bearer Token" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            setUsernameAvailable(false);
          }
          if (data === false) {
            setUsernameAvailable(true);
          }
        });
    }
  };

  return (
    <div className="register screen center-flex">
      {loading && <FullScreenLoader text="Inscription en cours" />}
      <div className="container flex-row">
        <form
          className="container__form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <img
            src={Logo}
            alt="Pin Earth Better Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
          <h1>Inscrivez-vous</h1>
          <div className="container__form__input">
            <p>
              Nom d'utilisateur
              {usernameAvailable !== undefined &&
                (usernameAvailable ? (
                  <label className={"dispo"}>✅ Disponible</label>
                ) : (
                  <label className={"indispo"}>🚫 Déjà utilisé</label>
                ))}
            </p>
            <input
              type="text"
              {...register("username")}
              placeholder="Nom d'utilisateur"
              onBlur={handleBlur}
              required
            />
            {!value[0] || errors.username ? (
              <span className="validation">
                <p>Entre 2 et 20 caractères</p>
                <p>✕</p>
              </span>
            ) : (
              <span className="validation yes">
                <p>Entre 2 et 20 caractères</p>
                <p>✓</p>
              </span>
            )}
          </div>
          <div className="container__form__input">
            <p>Adresse Email</p>
            <input
              type="email"
              {...register("email")}
              placeholder="Adresse Email"
              required
            />
            {!value[1] || (errors.email && value[1].length < 5) ? (
              <span className="validation">
                <p>Entre 5 et 40 caractères</p>
                <p>✕</p>
              </span>
            ) : (
              <span className="validation yes">
                <p>Entre 5 et 40 caractères</p>
                <p>✓</p>
              </span>
            )}
            {!value[1] || errors.email ? (
              <span className="validation">
                <p>Est de type Email</p>
                <p>✕</p>
              </span>
            ) : (
              <span className="validation yes">
                <p>Est de type Email</p>
                <p>✓</p>
              </span>
            )}
          </div>
          <div className="container__form__input">
            <p>Mot de passe</p>
            <input
              type="password"
              {...register("password")}
              placeholder="Mot de passe"
              required
            />
            {!value[2] || errors.password ? (
              <span className="validation">
                <p>Entre 8 et 30 caractères</p>
                <p>✕</p>
              </span>
            ) : (
              <span className="validation yes">
                <p>Entre 8 et 30 caractères</p>
                <p>✓</p>
              </span>
            )}
          </div>
          <div className="container__form__input">
            <p>Confirmer le mot de passe</p>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Mot de passe"
              required
            />
            {!value[3] || errors.confirmPassword ? (
              <span className="validation">
                <p>Est identique</p>
                <p>✕</p>
              </span>
            ) : (
              <span className="validation yes">
                <p>Est identique</p>
                <p>✓</p>
              </span>
            )}
          </div>
          <div className="container__form__checkbox flex-row">
            <input type="checkbox" {...register("conscentCgu")} required />
            <p>J'accepte les CGU</p>
          </div>
          {!usernameAvailable || !value || !isValid ? (
            <BoutonDefault text="S'inscrire" class="disabled" disabled={true} />
          ) : (
            <BoutonDefault text="S'inscrire" type="submit" disabled={false} />
          )}
          <p className="link">
            Déjà inscrit ? Je me{" "}
            <a onClick={() => navigate("/login")}>connecte</a>
          </p>
        </form>
        <div className="container__illustration center-flex">
          <img src={Illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
