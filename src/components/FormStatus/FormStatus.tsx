import "./FormStatus.css";

const FormStatus = (props: { text: string; success: boolean }) => {
  return (
    <div className={`message-box ${props.success ? "success" : "error"}`}>
      {props.text}
    </div>
  );
};

export default FormStatus;
