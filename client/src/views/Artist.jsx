import React, { useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardAlbum from "../components/card/CardAlbum";
import Comments from "../components/comment/Comments";
import List from "../components/List";
import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import LabPreview from "../components/LabPreview";

// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artist({ match }) {
  // const userContext = useContext(UserContext);
  // const { currentUser } = userContext;
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState([]);
  const artistId = match.params.id;

  useEffect(() => {
    fetchAlbums()
    apiHandler
      .get("/artists/" + artistId)
      .then(apiRes => {
          setArtist(apiRes.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [artistId])

  function fetchAlbums() {
    apiHandler
      .get(`/albums`)
      .then(res => {
        setAlbum(res.data.albums.filter(e => e.artist._id === artistId));
      })
      .catch(err => {
        console.error(err);
      });
  }

    if(!artist) return <div>No artist found</div>
  return (
    <React.Fragment>
      <h1 className="title">Artist view</h1>
      <p>{artist.name}</p>
      <p>{artist.description}</p>
      <p>{artist.style}</p>
    {album.length ? album.map(a => {
        return <p>{a.title}</p>
      }) : <p>No albums for this artist</p>}
    </React.Fragment>
  );
}
