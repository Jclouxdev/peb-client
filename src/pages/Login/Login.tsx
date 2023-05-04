import "./Login.scss";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import Logo from "../../assets/logo.png";
import Illustration from "../../assets/undraw_absorbed_in_re_ymd6.svg";
import FormStatus from "../../components/FormStatus/FormStatus";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";

const schema = yup.object().shape({
  email: yup.string().email().min(5).max(40).required(),
  password: yup.string().min(8).max(30).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>();

  const [searchParams, setSearchParams] = useSearchParams();
  let success = searchParams.get("success");
  let error = searchParams.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    reset();
    try {
      await fetch(
        // `${import.meta.env.BASE_URL}/user/login`,
        `http://localhost:8080/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.statusCode == 401) {
            console.log("Login failed");
            setLoginSuccess(false);
          } else {
            console.log("Login success");
            localStorage.setItem("token", data.access_token);

            setLoginSuccess(true);
            navigate("/app");
          }
        });
    } catch (error) {
      console.log("Login failed");
      setLoginSuccess(false);
    }
  };

  return (
    <div className="login screen center-flex">
      {loading && <FullScreenLoader text="Tentative de connexion" />}
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
          <h1>Connectez-vous</h1>
          <div className="decorated-text">
            <p>Se connecter avec un email</p>
            <div className="hr"></div>
          </div>
          {success == "true" && (
            <FormStatus
              text="Inscription validée, connectez-vous"
              success={true}
            />
          )}
          {success == "false" && error == "duplicatedEmail" && (
            <FormStatus
              text="Un compte existe déjà pour cet email"
              success={false}
            />
          )}
          {loginSuccess !== undefined && !loginSuccess && (
            <FormStatus text="Email ou mot de passe invalide" success={false} />
          )}
          <div className="container__form__input">
            <p>Adresse Email</p>
            <input
              type="email"
              {...register("email")}
              placeholder="Adresse Email"
            />
            <p className="login-error">
              <>{errors.email?.message}</>
            </p>
          </div>
          <div className="container__form__input">
            <p>Mot de passe</p>
            <input
              type="password"
              {...register("password")}
              placeholder="Mot de passe"
            />
            <p className="login-error">
              <>{errors.password?.message}</>
            </p>
          </div>
          <BoutonDefault text="Se connecter" />
          <div className="decorated-text margin-block">
            <p>Pas encore de compte ?</p>
            <div className="hr"></div>
          </div>
          <p className="link">
            Je m'<a onClick={() => navigate("/register")}>inscrit</a>
          </p>
        </form>
        <div className="container__illustration center-flex">
          <img src={Illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
