import React from "react";
import { Box } from "@mui/material";
import "./Dropdown.scss";
import { useTranslation } from "react-i18next";

export default function Dropdown({
  label,
  listItem,
  value,
  name,
  onChange,
  disabled,
}) {
  return (
    <>
      <Box component="div" className="input_component">
        <label htmlFor="dropdown" className="label">
          {label}
        </label>
        <select
          id="dropdown"
          className="input"
          value={value}
          name={name}
          onChange={onChange}
          disabled={disabled}
        >
          {listItem.map((item) => (
            <option key={item.id} value={item.name} hidden={item.disabled}>
              {item.name}
            </option>
          ))}
        </select>
      </Box>
    </>
  );
}
