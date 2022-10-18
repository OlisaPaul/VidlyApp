import React from "react";

const Select = ({ name, label, dropdown, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        <option></option>
        {dropdown.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
