import { FormControl, TextField } from "@mui/material";
import { DesktopTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { Controller } from "react-hook-form";

function TimePickerField({
  name,
  label,
  control,
  defaultValue,
  disabled,
  sx,
  variant,
  inputProps,
  type,
  inputRef,
  error,
  format24hr, // New prop to indicate whether to use 24-hour format
  onChange,
  value,
  onError,
  ...rest
}) {
  return (
    <div className="w-full">
      <FormControl className="w-full" sx={sx} size="small">
        <Controller
          sx={{ width: "100%", height: "40px" }}
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                renderInput={(params) => (
                  <TextField
                    onError={onError}
                    error={error}
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
                ampm={!format24hr} // Use 12-hour format if format24hr is false
                sx={{
                  "& .css-1q3qg0t-MuiInputBase-root-MuiOutlinedInput-root": {
                    height: "36px",
                  },
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    fontSize: " 14px",
                  },
                  "& .css-1ayhp4g-MuiFormLabel-root-MuiInputLabel-root": {
                    fontSize: " 14px",
                  },
                  "& .css-i4bv87-MuiSvgIcon-root": {
                    fontSize: " 22px",
                    color: "#073763",
                  },
                  "& .css-wnl09l-MuiFormLabel-root-MuiInputLabel-root": {
                    top: "-9px",
                  },
                }}
                {...rest}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
}

export default TimePickerField;
