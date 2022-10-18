import React from "react";

const Genre = ({ genre, textName, handleGenre, selectedGenre }) => {
  return (
    <ul className="list-group">
      {genre.map((c) => (
        <li
          className={
            selectedGenre === c
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          key={c[textName]}
          onClick={() => handleGenre(c)}
        >
          {c[textName]}
        </li>
      ))}
    </ul>
  );
};

Genre.defaultProps = {
  textId: "_id",
  textName: "name",
};

export default Genre;
