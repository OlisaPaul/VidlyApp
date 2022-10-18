import React from "react";

const Like = (props) => {
  let toggleLiked = "fa btn fa-heart";
  if (!props.liked) toggleLiked += "-o";
  return (
    <i className={toggleLiked} onClick={props.onClick} aria-hidden="true"></i>
  );
};

export default Like;
