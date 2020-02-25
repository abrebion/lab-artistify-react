import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "./../../api/APIHandler";
import Card from "./Card";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  useEffect(() => {
    apiHandler
      .get("/users/:id/favorites")
      .then(res => {})
      .catch(error => {});
  }, []);

  return (
    <Card>
      <Link to={`/artists/${data._id}`}>{data.name}</Link>
      <IconFav resourceId={data._id} resourceType="artists"></IconFav>
    </Card>
  );
}
