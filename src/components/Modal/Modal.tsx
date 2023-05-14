import { useState } from "react";
import "./Modal.scss";

const Modal = ({ content, display }: { content: any; display: boolean }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(
    display ? display : false
  );

  return (
    <div id="myModal" className={`wrapper ${display ? "" : "none"}`}>
      <div className="wrapper__modal">
        <>{content}</>
      </div>
    </div>
  );
};

export default Modal;
