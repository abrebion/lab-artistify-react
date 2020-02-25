import React, { useContext, useEffect, useState } from "react";
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

  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState([]);
  const artistId = match.params.id;

  const [artistAvgScore, setArtistAvgScore] = useState(0);

  function getAvgScore(obj) {
    const avgScore =
      obj.reduce((acc, el) => {
        return (acc += el.rate);
      }, 0) / obj.length;
    return isNaN(avgScore) ? 0 : avgScore;
  }

  useEffect(() => {
    apiHandler
      .get("/artists/" + match.params.id)
      .then(res => {
        // const avgScore = getAvgScore(res.data.rates);
        setArtistAvgScore(getAvgScore(res.data.rates));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleVote = () => {
    apiHandler
      .patch("/artists/" + match.params.id, {})
      .then(res => {})
      .catch(err => {
        console.error(err);
      });
  };

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
      <Stars mode="display" avgRate={artistAvgScore} />
      <br></br>
      <Stars mode="vote" clbk={handleVote} css="user stars" />
    {album.length ? album.map((a,i) => {
        return <p key={i}>{a.title}</p>
      }) : <p>No albums for this artist</p>}
 
    </React.Fragment>
  );

}
