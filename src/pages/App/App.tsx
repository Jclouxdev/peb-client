import { useEffect, useMemo, useState } from "react";
import BoutonDefault from "../../components/Boutons/Default/BoutonDefault";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";

import "./App.scss";
import Logo from "../../assets/logo.png";
import ProfilePic from "../../assets/dog1.png";
import Map from "../../assets/Map.png";
import WrappedList from "../../components/WrappedList/WrappedList";
import Profile from "../../components/Profile/Profile";
import IUser from "./IUser";
import ICategorie from "./ICategorie";
import IMarker from "./IMarker";

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [categories, setCategories] = useState<ICategorie[] | undefined>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [markers, setMarkers] = useState<IMarker[]>();

  // Fetch current user and redirect if no token
  useEffect(() => {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      navigate("/login");
    }
    fetch(`http://localhost:8080/user/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          avatarUrl: data.avatarUrl,
          creationDate: data.creationDate,
        });
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch(`http://localhost:8080/categories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: ICategorie[]) => {
        setCategories(data);
      });
  }, []);

  const disconnect = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch Markers
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/markers/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data: IMarker[]) => {
        setMarkers(data);
      });
  }, []);

  const sortedMarkers = useMemo(() => {
    if (!markers) {
      return [];
    }

    return markers.reduce<{ [key: number]: IMarker[] }>((acc, marker) => {
      if (!Object.keys(acc).includes(marker.categorie.id.toString())) {
        acc[marker.categorie.id] = [];
      }

      acc[marker.categorie.id].push(marker);
      acc[marker.categorie.id].sort(orderMarkers);
      return acc;
    }, {});
  }, [markers]);

  console.log(JSON.stringify(sortedMarkers));

  // Tri par Asc
  function orderMarkers(a: IMarker, b: IMarker) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  return (
    <div id="app" className="screen">
      {loading && <FullScreenLoader text="Chargement de la carte" />}
      <div className="screen__nav">
        <div className="screen__nav__logo">
          <img
            src={Logo}
            alt="Pin Earth Better Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="screen__nav__userCard">
          <div className="screen__nav__userCard__pic">
            <img
              src={ProfilePic}
              alt="Pin Earth Better Logo"
              className="logo"
              onClick={() => setIsActive(true)}
            />
          </div>
          <div className="screen__nav__userCard__infos">
            <div className="screen__nav__userCard__infos__username">
              <p>{user?.username}</p>
            </div>
            <div className="screen__nav__userCard__infos__connectedDisconnected">
              <p>🟢 Connecté</p>
              <a onClick={disconnect}>
                {" "}
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Se déconnecter
              </a>
            </div>
          </div>
        </div>
        <div className="screen__nav__mapSearchBar">
          <div className="screen__nav__mapSearchBar__searchIcons">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            className="screen__nav__mapSearchBar__input"
            type="text"
            name="mapSearchBar"
            placeholder="23 rue des Tournesols..."
          />
          <div className="screen__nav__mapSearchBar__locIcon">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
        </div>
        <div className="decorated-text">
          <p>Mes marqueurs</p>
          <div className="hr"></div>
        </div>
        <div className="screen__nav__markerSearchBar">
          <div className="screen__nav__markerSearchBar__searchIcons">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            className="screen__nav__markerSearchBar__input"
            type="text"
            name="markerSearchBar"
            placeholder="Pizzeria Mirabella"
          />
        </div>
        <div className="screen__nav__categories">
          <>
            {categories == undefined ? (
              <p>Pas de catégories</p>
            ) : (
              Object.entries(sortedMarkers).map(([categoryId, markers]) => (
                <div>
                  <p>
                    {
                      categories.find(({ id }) => id === Number(categoryId))
                        ?.name
                    }
                    {markers.map((marker) => (
                      <div>{marker.name}</div>
                    ))}
                  </p>
                </div>
              ))
            )}
          </>
          <WrappedList title="Restaurants" childrens={["Pizza Mirabella"]} />
        </div>
      </div>
      {user && <Profile isActive={isActive} setter={setIsActive} user={user} />}
      <div className="screen__mapArea">
        <img src={Map} alt="Map" />
      </div>
    </div>
  );
};

export default App;
