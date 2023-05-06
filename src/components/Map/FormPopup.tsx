import React, { useState } from 'react';
import "./Form.css"

interface PropTypes {
  onSubmit: (data: any) => Promise<void>;
  latPosition: {};
  lngPosition: {};

}


export function ModalPopup({onSubmit, latPosition, lngPosition}: PropTypes) {
    const [popupContent, setPopupContent] = useState({
        title: "",
        description: "",
        categorie: "",
        lat: {},
        lon: {},
        });

    const handleInputChange = (event) => {
        setPopupContent({ ...popupContent, [event.target.name]: event.target.value, lat: latPosition, lon: lngPosition });
    }
        
    const handleSubmit = async (event) => {
      event.preventDefault();
      await submitData();
      await onSubmit(popupContent)
      console.log(popupContent);
      setPopupContent({ title: "", description: "", categorie: "", lat: {}, lon: {}});
    };
  
    const submitData = async () => {
      try {
          const response = await fetch("http://localhost:8080/markers/create", {
              method: "POST",
              headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', },
              body: JSON.stringify(popupContent),
          });
          const responseData = await response.json();
          console.log(responseData);
      } catch (error) {
          console.error(error);
      }
    }
    

  return (
    <div className="popup-wrapper">
      <form className='login-box'>
        <div>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            onChange={handleInputChange}
            value={popupContent.title}
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            onChange={handleInputChange}
            value={popupContent.description}
          />
        </div>
        <div className="user-box">
        <input
            type="text"
            name="categorie"
            placeholder="Categorie"
            required
            onChange={handleInputChange}
            value={popupContent.categorie}
          />
        </div>
        <div>
          <button
          type="submit"
          onClick={handleSubmit}
          >Submit</button>
        </div>
      </form>
    </div>
  );
}
