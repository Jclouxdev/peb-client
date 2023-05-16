import { Marker, Popup, TileLayer } from "react-leaflet";
import MyMarker from "../Marker/AddMarker";
import LeadletMyPosition from "../Marker/LocationMarker";
import IMarker from "../../../pages/App/IMarker";
import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useState } from "react";
import "./MapContent.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(2).max(20).required(),
});


const icon = new L.Icon({
  iconUrl: "/src/assets/location-pin-connectsafely-37.png",
  iconSize: [40, 40],
  popupAnchor: [-0, -20], // point from which the popup should open relative to the iconAnchor
});

const MapContent = ({
  markers,
  selectedMarker,
  setSelectedMarkerId,
}: {
  markers: IMarker[] | undefined;
  selectedMarker: string | undefined;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const mapContext = useLeafletContext();
  const [shareMarker, setShareMarker] = useState<boolean>(false);
  const [shareMarkerSuccess, setShareMarkerSuccess] = useState<
    boolean | undefined
  >(undefined);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!selectedMarker || !markers) {
      return;
    }
    const getMarker = markers.find((marker) => marker.id === selectedMarker);
    if (!getMarker) {
      return;
    }

    const latlgn = L.latLng(
      parseFloat(getMarker.lat),
      parseFloat(getMarker.lon)
    );
    mapContext.map.flyTo(latlgn, 16);
  }, [selectedMarker]);

  const onSubmitHandler = (data: any) => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BASE_URL}/markers/${selectedMarker}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode == 404 || data.statusCode == 401) {
          setShareMarkerSuccess(false);
        } else {
          setShareMarkerSuccess(true);
        }
        console.log(data);
      })
      .catch((error) => {
        setShareMarkerSuccess(false);
        console.log(error);
      });
  };

  const deleteMarker = (data: any) => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BASE_URL}/markers/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setSelectedMarkerId(data);
          window.location.reload();
        } else {
          throw new Error("Failed to delete marker");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmDeleteMarker = (data: any) => {
    if (window.confirm("êtes vous sur de supprimer cette emplacement ?")) {
      deleteMarker(data);
    }
  };

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers && markers.length > 0 ? (
        markers.map((place) => {
          return (
            <Marker
              key={place.id}
              position={[parseFloat(place.lat), parseFloat(place.lon)]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  setSelectedMarkerId(place.id);
                },
              }}
            >
              <Popup className="marker__popup">
                <div className="marker__popup__infos">
                  <h2>{place.name}</h2>
                  <p>{place.description}</p>
                </div>
                <hr />
                <div className="marker__popup__nav">
                  <div
                    className="marker__popup__nav__share"
                    onClick={() => {
                      if (shareMarker) {
                        setShareMarker(false);
                      }
                      if (!shareMarker) {
                        setShareMarker(true);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                      />
                    </svg>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className={`marker__popup__nav__input ${
                      shareMarker ? "display" : ""
                    }`}
                  >
                    <input
                      type="text"
                      {...register("username")}
                      required
                      placeholder="Partager à ..."
                    />
                    <button className="marker__popup__nav__input__button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </form>
                  <div className="marker__popup__nav__edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                  <div
                    className="marker__popup__nav__close"
                    id="marker_popup_nav_close"
                    onClick={() => {
                      confirmDeleteMarker(selectedMarker);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
                {shareMarkerSuccess && (
                  <p className="shared__success">
                    Marqueur partagé avec succès !
                  </p>
                )}
                {!shareMarkerSuccess && shareMarkerSuccess !== undefined && (
                  <p className="shared__failed">
                    <>Aucun utilisateur trouvé pour ce nom</>
                  </p>
                )}
              </Popup>
            </Marker>
          );
        })
      ) : (
        <p>No data available.</p>
      )}
      <MyMarker />
      <LeadletMyPosition />
    </>
  );
};

export default MapContent;
