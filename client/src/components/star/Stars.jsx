import React from "react";
import Star from "./Star";
import StarClickable from "./StarClickable";

export default function stars({ avgRate, clbk, css, maxRate = 5, mode }) {
  const star = Math.round(avgRate);

  function displayScoreWidget() {
    const rating = [];
    let i = 1;
    while (i <= maxRate) {
      if (i <= star) rating.push(<Star shape="full" key={i} />);
      else rating.push(<Star shape="empty" key={i} />);
      i++;
    }
    return rating;
  }

  function userScoreWidget() {
    const rating = [];
    let i = 1;
    while (i <= maxRate) {
      rating.push(<StarClickable shape="empty" key={i} css={css} />);
      i++;
    }
    return rating;
  }

  return <div>{mode === "display" ? displayScoreWidget() : userScoreWidget()}</div>;
}
