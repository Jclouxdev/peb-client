import { useState } from "react";
import "./FullScreenLoader.scss";

const FullScreenLoader = (props: { text?: string }) => {
  return (
    <div className="fullScreenLoader">
      <p>{props.text}</p>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
