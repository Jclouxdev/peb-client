import React, { useState } from 'react';

export function FormPopup() {
    const [popupContent, setPopupContent] = useState({
        title: "",
        descritpion: "",
        categorie: "",
        });

    const handleInputChange = (event) => {
        setPopupContent({ ...popupContent, [event.target.name]: event.target.value });
    }
        
    const handleSubmit = (event) => {
        event.preventDefault();
        setPopupContent({ title: "", descritpion: "", categorie: "" });
    };

  return (
    <div className="login-box">
      <form>
        <div>
          <h3>Contact Form</h3>
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
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
            value={popupContent.descritpion}
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
