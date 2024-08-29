import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  autoComplete,
  placeholder,
  maxLength,
  minLength,
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        className="mr-2 h-12 p-2"
        maxLength={maxLength}
        minLength={minLength}
      />
    </>
  );
};

export default InputArea;
