import React, { useEffect, useState } from "react";
import "./Form.css";
import ICategorie from "../../pages/App/ICategorie";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface PropTypes {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  latPosition: {};
  lngPosition: {};
}

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required(),
  description: yup.string().min(8).max(40).required(),
  categorieId: yup.number().integer().required(),
  lat: yup.number().required(),
  lon: yup.number().required(),
});

export function ModalPopup({
  setShowPopup,
  latPosition,
  lngPosition,
}: PropTypes) {
  const [categories, setCategories] = useState<ICategorie[] | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      lat: latPosition,
      lon: lngPosition,
      name: "",
      description: "",
      categorieId: 1,
    },
  });

  useEffect(() => {
    fetch(`http://localhost:8080/categories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: ICategorie[]) => {
        setCategories(data);
      });
  }, []);

  const onSubmitHandler = async (data: any) => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BASE_URL}/markers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowPopup(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  return (
    <div className="popup-wrapper">
      <form className="login-box" onSubmit={handleSubmit(onSubmitHandler)}>
        <div
          className="login-box__close"
          onClick={() => {
            setShowPopup(false);
          }}
        >
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
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p> Close</p>
        </div>
        <div className="user-box">
          <p className="user-box__title">Nom</p>
          <input
            type="text"
            {...register("name")}
            placeholder="Title"
            required
          />
        </div>
        <div className="user-box">
          <p className="user-box__title">Description</p>
          <input
            type="text"
            {...register("description")}
            placeholder="Description"
            required
          />
        </div>
        <div className="user-box">
          <p className="user-box__title">Catégories</p>
          <select {...register("categorieId", { valueAsNumber: true })}>
            <>
              {categories?.map((element) => {
                return <option value={element.id}>{element.name}</option>;
              })}
            </>
          </select>
        </div>
        <div>
          <button type="submit">Placer</button>
        </div>
      </form>
    </div>
  );
}
