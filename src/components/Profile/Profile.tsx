import { useForm, useWatch } from "react-hook-form";
import "./Profile.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ProfilePic from "../../assets/dog1.png";
import BoutonDefault from "../Boutons/Default/BoutonDefault";
import CloseButton from "../../assets/close.png";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  avatarUrl: string;
  creationDate: string;
}

const schema = yup.object().shape({
  email: yup.string().email().optional().min(5).max(40),
  avatar: yup.string(),
  newPassword: yup
    .string()
    .notRequired()
    .nullable()
    .min(8)
    .max(30)
    .transform((value) => (!!value ? value : null)),
  confirmNewPassword: yup
    .string()
    .min(8)
    .max(100)
    .oneOf(
      [yup.ref("newPassword")],
      "Les mots de passes ne sont pas identiques !"
    )
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
  currentPassword: yup.string().min(8).max(30).required(),
});

const Profile = (props: {
  isActive: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      username: props.user.username,
      email: props.user.email,
      avatar: props.user.avatarUrl,
      newPassword: undefined,
      confirmNewPassword: undefined,
      currentPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<{
    status: boolean | undefined;
    reason?: string;
  }>();
  const navigate = useNavigate();

  let values = useWatch({
    control,
    name: ["email", "newPassword", "confirmNewPassword"],
  });

  const onSubmitHandler = (data: any) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    // reset();

    fetch(`${import.meta.env.VITE_BASE_URL}/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode >= 400) {
          if (data.statusCode < 500) {
            setLoading(false);
            setUpdateSuccess({ status: false, reason: "password" });
          } else {
            setLoading(false);
            setUpdateSuccess({ status: false, reason: "email" });
          }
        } else {
          setUpdateSuccess({ status: true });
          setLoading(false);
          // Logout if email has been update
          if (props.user.email !== values[0]) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setUpdateSuccess({ status: false, reason: "other" });
      });
  };

  return (
    <div className="profile">
      {loading && <FullScreenLoader text="Modification en cours" />}
      <div
        id="container"
        className={`container ${props.isActive ? "active" : ""}`}
      >
        <div
          className="container__close"
          onClick={() => {
            props.setter(false);
          }}
        >
          <img src={CloseButton} />
        </div>
        <div className="profile__decorated-text">
          <p>Informations</p>
          <div className="hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="container__form__input">
            <p>Nom d'utilisateur</p>
            <div className="container__form__input__flex">
              <input
                type="text"
                {...register("username")}
                placeholder="Nom d'utilisateur"
                disabled
              />
              <div className="svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <span className="tooltip">
                  Le nom d'utilisateur ne peut pas être modifié. Contactez le
                  support pour plus d'informations.
                </span>
              </div>
            </div>
          </div>
          <div className="container__form__input">
            <p>Adresse Email</p>
            <p className="container__form__validation__text__email">
              <strong>Modifier l'email</strong> entrainera une
              <strong> deconnexion</strong>.
            </p>
            <input
              type="email"
              {...register("email")}
              placeholder="Adresse Email"
            />
            {!values[0] || (errors.email && values[0].length < 5) ? (
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
            {!values[0] || errors.email ? (
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
            {updateSuccess?.reason == "email" && (
              <span className="validation no">
                <p>Un compte est déjà associé à cet email</p>
                <p>✕</p>
              </span>
            )}
          </div>
          <div className="container__form__input">
            <p>Avatar</p>
            <div className="container__form__input__row">
              <img src={ProfilePic} />
              <div className="container__form__input__row__upload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p>
                  Cliquez pour <strong>uploader</strong> une image
                </p>
              </div>
            </div>
          </div>
          <div className="profile__decorated-text">
            <p>Sécurité</p>
            <div className="hr"></div>
          </div>
          <h2>Changer de mot de passe</h2>
          <div className="container__form__input">
            <p>Nouveau mot de passe</p>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="Mot de passe"
              required={false}
            />
            {!values[1] || errors.newPassword ? (
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
              {...register("confirmNewPassword")}
              placeholder="Mot de passe"
            />
            {!values[2] || errors.confirmNewPassword ? (
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
          <div className="container__form__validation">
            {updateSuccess?.status == true && (
              <div id="message_popup_success">
                <p>Le profil a bien été mis à jour</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    // A Remplacer par un state
                    const elem = document.getElementById(
                      "message_popup_success"
                    );
                    elem!.style.display = "none";
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
            <div className="profile__decorated-text">
              <p>Validation</p>
              <div className="hr"></div>
            </div>
            <p className="container__form__validation__text">
              Pour <strong>valider</strong> les changements, merci de{" "}
              <strong>taper le mot de passe actuel</strong> du compte.
            </p>
            <div className="container__form__input">
              <p>Mot de passe</p>
              <input
                type="password"
                {...register("currentPassword")}
                placeholder="Mot de passe"
                required
              />
              {updateSuccess?.reason == "password" && (
                <p className="failed">Mot de passe incorrect</p>
              )}
            </div>
            <BoutonDefault
              text="Valider les modifications"
              class="green"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
