import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import Card from "./Card";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

function CardArtist({ data }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  function isAlreadyFavorite() {
    return currentUser.favorites.artists.includes(data._id);
  }

  return (
    <React.Fragment>
      <Link to={`/artists/${data._id}`}>{data.name}</Link>
      {!!Object.keys(currentUser).length && <IconFav resourceId={data._id} resourceType="artists" isAlreadyFavorite={isAlreadyFavorite()}></IconFav>}
    </React.Fragment>
  );
}

export default CardArtist;
