import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="form-outline mb-4 mr-4">
      <input
        placeholder="Search..."
        type="search"
        name="search"
        onChange={onChange}
        className="form-control"
        id="datatable-search-input"
        value={value}
      />
    </div>
  );
};

export default SearchBox;
