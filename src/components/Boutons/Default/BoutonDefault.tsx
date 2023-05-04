import { MouseEventHandler } from "react";
import "./BoutonDefault.css";

const BoutonDefault = (props: {
  text: string;
  type?: "submit";
  class?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={`button default ` + props.class}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default BoutonDefault;
