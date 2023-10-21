import { useEffect, useState } from "react";
import "./App.css";
import Searcher from "./Searcher";

function App() {
  const CLIENT_ID = "621e618aa9614324b5834627d9e09ec7";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="SearchContainer">
          <h2>Searchly</h2>
          {!token ? (
            <div>
              <a
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            </div>
          ) : (
            <div>
              <Searcher token={token} />
              <button className="logOut" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
