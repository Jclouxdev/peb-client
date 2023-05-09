import { key } from "localforage";
import IMarker from "../../pages/App/IMarker";
import "./WrappedList.scss";

const WrappedList = (props: {
  title: string;
  childrens: { [key: number]: IMarker[] };
}) => {
  console.log(props.childrens);

  return (
    <div className="wrappedList">
      <button className="accordion">{props.title}</button>
      <div className="panel">
        {/* <>
          {props.childrens.map((element) => {
            return <p>{element}</p>;
          })}
        </> */}
        <p>
          <>{JSON.stringify(props.childrens[1])}</>
        </p>
      </div>
    </div>
  );
};

export default WrappedList;
