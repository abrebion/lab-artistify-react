import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/APIHandler";

// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

function FormAlbum({ mode = "create", _id, history, match }) {
  const [artists, setArtists] = useState([]);
  const [labels, setLabels] = useState([]);
  const [{ title, cover, releaseDate, artist, description, label }, setFormData] = useState({
    title: "",
    description: "",
    cover: "",
    releaseDate: "",
    artist: "",
    label: ""
  });

  function fetchLabels() {
    apiHandler
      .get("/labels")
      .then(res => {
        setLabels(res.data.labels);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function fetchArtists() {
    apiHandler
      .get("/artists")
      .then(res => {
        setArtists(res.data.artists);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchArtists();
    fetchLabels();
    if (mode === "edit") {
      apiHandler
        .get("/albums/" + _id)
        .then(res => {
          console.log("Fetched Data:", res.data);
          setFormData({ ...res.data });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [mode, _id]);

  const submitHandler = e => {
    e.preventDefault();
    if (mode === "create") {
      apiHandler
        .post("/albums", {
          title,
          description,
          cover,
          releaseDate,
          artist,
          label
        })
        .then(res => {
          history.push("/admin/albums");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      apiHandler
        .patch("/albums/" + _id, {
          title,
          description,
          cover,
          releaseDate,
          artist,
          label
        })
        .then(res => {
          history.push("/admin/albums");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const inputHandler = e => {
    let value = e.target.value;
    setFormData({ title, label, cover, releaseDate, artist, description, [e.target.name]: value });
  };
  // render() {
  return (
    <div>
      <form onSubmit={submitHandler} onChange={inputHandler}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" value={title} />
        <label htmlFor="cover">Cover</label>
        <input type="text" name="cover" value={cover} />
        <label htmlFor="releaseDate">Release Date</label>
        <input type="date" name="releaseDate" value={releaseDate || ""} />
        <label htmlFor="artist"> Artist</label>
        <select value={artist} name="artist" id="artist">
          <option>Choose an artist...</option>
          {artists.map((el, i) => (
            <option key={i} value={el._id}>
              {el.name}
            </option>
          ))}
        </select>
        <label htmlFor="label">Label</label>
        <select value={label} name="label" id="label">
          <option>Choose a style...</option>
          {labels.map((el, i) => (
            <option key={i} value={el._id}>
              {el.name}
            </option>
          ))}
        </select>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" value={description} />
        <button>{mode === "create" ? "Create" : "Update"}</button>
      </form>
    </div>
  );
}
// }

export default withRouter(FormAlbum);
