import { useState, useEffect } from "react";
import axios from "axios";

function Searcher(props) {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([])
  const access_token = props.token;

  const searchArtist = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    var artistID = data.artists.items[0].id;

    var artistTracks = await axios.get(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 10,
          market: "US",
        },
      }
    );

    setTracks(artistTracks.data.tracks);
    setArtists(data.artists.items)
  };


  const renderArtists = () => {
    return artists.map(artist => (
        <div className="artistDiv" key={artist.id}>
            {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}


  return (
    <>
      <div className="SearchForm">
        <input
          className="Name"
          type="text"
          placeholder="Search By Artist Name ..."
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <button onClick={searchArtist}>Search</button>
      </div>

      {tracks.slice(0, 5).map((track) => (
        <div key={track.id}>
          <ul>
            <li> {track.name}  </li>
          </ul>
        </div>
      ))}
      <div className= "artist">
      {renderArtists()}
      </div>
    </>
  );
}

export default Searcher;
