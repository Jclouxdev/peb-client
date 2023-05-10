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
  description: yup.string().max(40).required(),
  categorieId: yup.number().required(),
  lat: yup.number().required(),
  lon: yup.number().required(),
});

export function ModalPopup({ onSubmit, latPosition, lngPosition }: PropTypes) {
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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/markers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
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
          <select {...register("categorieId")}>
            <>
              {categories?.map((element) => {
                return <option value={element.id}>{element.name}</option>;
              })}
            </>
          </select>
          {errors.categorieId && <p>{errors.categorieId.message}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
