import React, { useContext } from "react";
import APIHandler from "./../../api/APIHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../auth/UserContext";

export default function IconFavorite({ isAlreadyFavorite = false, resourceId, resourceType }) {
  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const toggleFavorite = () => {
    APIHandler.patch(`/users/favorites/${resourceType}/${resourceId}`, {})
      .then(apiRes => {
        setCurrentUser(apiRes.data.user);
      })
      .catch(apiErr => console.error(apiErr));
  };

  return (
    <FontAwesomeIcon
      onClick={toggleFavorite}
      className={`fa-lg icon-favorite is-clickable ${isAlreadyFavorite ? "is-favorite" : ""}`}
      icon={isAlreadyFavorite ? faHeartFull : faHeart}
      size="xs"
    />
  );
}
