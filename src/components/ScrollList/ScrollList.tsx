import IMarker from "../../pages/App/IMarker";
import "./ScrollList.scss";
import ICategorie from "../../pages/App/ICategorie";
import BoutonDefault from "../Boutons/Default/BoutonDefault";
import { useState } from "react";

const ScrollList = (props: {
  childrens: { [key: number]: IMarker[] };
  categories: ICategorie[] | undefined;
  selectedMarkerId: string | undefined;
  onSelectMarker: (markerId: string) => void;
}) => {
  return (
    <div className="scrollList">
      <div className="panel">
        <>
          {Object.keys(props.childrens).length == 0 ? (
            <div className="panel__noMarkers">
              <p>
                Vous n'avez pas encore de marqueurs.<br></br>
                <strong>Créez en un tout de suite !</strong>
              </p>
              <BoutonDefault text="Placer un marqueur" />
            </div>
          ) : (
            Object.entries(props.childrens).map(([categoryId, markers]) => (
              <div className="panel__category">
                <h3 className="panel__category__title">
                  {
                    props.categories?.find(
                      ({ id }) => id === Number(categoryId)
                    )?.name
                  }
                </h3>
                <div className="panel__category__markers">
                  {markers.map((marker) => (
                    <p
                      className={`panel__category__markers__link ${
                        marker.id == props.selectedMarkerId ? "active" : ""
                      }`}
                      onClick={() => {
                        props.onSelectMarker(marker.id);
                      }}
                    >
                      {marker.name}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      </div>
    </div>
  );
};

export default ScrollList;
