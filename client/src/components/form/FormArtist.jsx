import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/APIHandler";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";

function FormArtist({ mode = "create", _id, history, match }) {
  const [styles, setStyles] = useState([]);
  const [{ name, description, style, isBand }, setFormData] = useState({
    name: "",
    description: "",
    style: "",
    isBand: null
  });

  function fetchStyles() {
    apiHandler
      .get("/styles")
      .then(res => {
        setStyles(res.data.styles);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchStyles();
    if (mode === "edit") {
      apiHandler
        .get("/artists/" + _id)
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
        .post("/artists", {
          name,
          description,
          style,
          isBand
        })
        .then(res => {
          // console.log("Success", res.data);
          history.push("/admin/artists");
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      apiHandler
        .patch("/artists/" + _id, {
          name,
          description,
          style,
          isBand
        })
        .then(res => {
          // console.log("Success", res.data);
          history.push("/admin/artists");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const inputHandler = e => {
    // e.persist();
    // setFormData(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
    // console.log("FormData", { name, description, style, isBand });
    let value = e.target.value;
    if (e.target.type === "radio") {
      value = e.target.checked && e.target.value === "true" ? true : false;
    }
    setFormData({ name, description, style, isBand, [e.target.name]: value });
  };
  return (
    <div>
      {console.log("FormData Render", { name, description, style, isBand })}
      <form onSubmit={submitHandler} onChange={inputHandler} className="form">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input type="text" name="name" id="name" placeholder="Enter artist name" value={name} className="input" />
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea name="description" id="description" placeholder="Enter a description" value={description} className="input"></textarea>
        <label htmlFor="style" className="label">
          Style
        </label>
        <select name="style" id="style" value={style} className="input">
          <option>Choose a style...</option>
          {styles.map((el, i) => (
            <option key={i} value={el._id}>
              {el.name}
            </option>
          ))}
        </select>
        <label className="label">Is Band?</label>
        <div>
          <label htmlFor="isBand" className="label">
            Yes
          </label>
          <input type="radio" name="isBand" id="isBand" value="true" checked={isBand === true} />
          <label htmlFor="isnotband" className="label">
            No
          </label>
          <input type="radio" name="isBand" id="isnotband" value="false" checked={isBand === false} />
        </div>
        <button>{mode === "create" ? "Create" : "Update"}</button>
      </form>
    </div>
  );
}

export default withRouter(FormArtist);
