import React, { Component } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardArtist from "../components/card/CardArtist";
import List from "../components/List";
import LabPreview from "../components/LabPreview";
// styles
import "../styles/card.css";

export default class Artists extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    apiHandler.get("/artists").then(apiRes => {
      this.setState({ artists: apiRes.data.artists });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="title">All artists</h1>
        <List data={this.state.artists} Component={CardArtist} cssList="cards" cssItem="card artist" />
        <hr />
        <LabPreview name="artists" />
      </React.Fragment>
    );
  }
}
