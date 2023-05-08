import "./WrappedList.scss";

const WrappedList = (props: { title: string; childrens: any[] }) => {
  return (
    <div className="wrappedList">
      <button className="accordion">{props.title}</button>
      <div className="panel">
        <>
          {props.childrens.map((element) => {
            return <p>{element}</p>;
          })}
        </>
      </div>
    </div>
  );
};

export default WrappedList;
