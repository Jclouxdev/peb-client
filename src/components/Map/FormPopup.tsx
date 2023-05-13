import React, { useEffect, useState } from "react";
import "./Form.css";
import ICategorie from "../../pages/App/ICategorie";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface PropTypes {
  onSubmit: (data: any) => Promise<void>;
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

export function ModalPopup({ latPosition, lngPosition }: PropTypes) {
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
    console.log("Data before", data);

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
        console.log("Success : ", data);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  return (
    <div className="popup-wrapper">
      <form className="login-box" onSubmit={handleSubmit(onSubmitHandler)}>
        <div></div>
        <div className="user-box">
          <input
            type="text"
            {...register("name")}
            placeholder="Title"
            required
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            {...register("description")}
            placeholder="Description"
            required
          />
        </div>
        <div className="user-box">
          <select {...register("categorieId", { valueAsNumber: true })}>
            <>
              {categories?.map((element) => {
                return <option value={element.id}>{element.name}</option>;
              })}
            </>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
