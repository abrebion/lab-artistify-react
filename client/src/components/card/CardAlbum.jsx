import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import Card from "./Card";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardAlbum({ data }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  function isAlreadyFavorite() {
    return currentUser.favorites.albums.includes(data._id);
  }

  return (
    <React.Fragment>
      <Link to={`/albums/${data._id}`}>
        {data.title}
        <img src={data.cover}></img>
      </Link>
      {!!Object.keys(currentUser).length && <IconFav resourceId={data._id} resourceType="albums" isAlreadyFavorite={isAlreadyFavorite()}></IconFav>}
    </React.Fragment>
  );
}
