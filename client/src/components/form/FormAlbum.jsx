import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/APIHandler";

// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

function FormAlbum ({ mode = "create", _id, history, match}) {
const [artists, setArtists] = useState([]);
const [{cover, release, artist, description}, setFormData] = useState({
cover:"",
release:"",
artist:"",
description:""
});

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
      cover,
      release,
      artist,
      description
    }) 
    .then (res => {
      history.push("/admin/albums")
    })
    .catch (err => {
      console.log(err);
    })
  }
  else {
    apiHandler
    .patch("/albums/" + _id, {
      cover,
      release,
      artist,
      description
    })
    .then(res => {
      history.push("/admin/albums");
    })
    .catch(err => {
      console.log(err);
    })
  }
};

const inputHandler = e => {
  let value = e.target.value;
}
  // render() {
    return (
    <div>
      <form onSubmit={submitHandler} onChange={inputHandler}>
      <label htmlFor="cover">Cover</label>
      <input type="text" name="cover"/>
      <label htmlFor="release">Release Date</label>
      <input type="text" name="release"/>
      <label htmlFor="artist"> Artist</label>
      <select name="artist" id="artist"></select>  
      <label htmlFor="label">Label</label>
      <select name="label" id="label"></select>  
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description"/>
      <button>{mode === "create" ? "Create" : "Update"}</button>

      </form>
    </div>
    );
  }
// }

export default withRouter(FormAlbum);
