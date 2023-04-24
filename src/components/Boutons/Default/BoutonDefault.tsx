import "./BoutonDefault.css";

const BoutonDefault = (props: { text: string }) => {
  return <button className="button default">{props.text}</button>;
};

export default BoutonDefault;
