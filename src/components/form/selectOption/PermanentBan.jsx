import React from "react";
import { Select } from "@windmill/react-ui";

const PermanentBan = ({ setRole, register, name, label }) => {
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Select
        </option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>
    </>
  );
};

export default PermanentBan;
