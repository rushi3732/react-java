import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

import { Controller } from "react-hook-form";
const CheckBoxField = ({
  name,
  label,
  control,
  defaultValue,
  style,
  checkBoxStyle,
  defaultChecked,
}) => {
  return (
    <FormControlLabel
      control={
        <Controller
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          name={name}
          control={control}
          render={({ field: { value = false, ...field } }) => {
            return (
              <Checkbox
                size="small"
                {...field}
                checked={!!value}
                sx={{ "& .MuiSvgIcon-root": checkBoxStyle }}
              />
            );
          }}
        />
      }
      label={
        <span className="text-sm  " style={style}>
          {label}
        </span>
      }
    />
  );
};

export default CheckBoxField;
