import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
function DatePickerField({
  name,
  label,
  control,
  defaultValue,
  disabled,
  disablePast,
  disableFuture,
  sx,
  variant,
  inputProps,
  type,
  inputRef,
  inputFormat,
  error,
  dontCapitalize,
  color,
  onChange,
  minDate,
  value,
  onError,

  ...rest
}) {
  return (
    <div className="w-full">
      <FormControl className="w-full" sx={sx}>
        <Controller
          sx={{ width: "100%" }}
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={label}
                value={value}
                minDate={minDate}
                onChange={onChange}
                inputFormat={inputFormat}
                onBlur={onBlur}
                disabled={disabled}
                disablePast={disablePast}
                disableFuture={disableFuture}
                renderInput={(params) => (
                  <TextField
                    onError={onError}
                    error={error}
                    {...params}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      style: {
                        fontSize: "14px",
                        position: "absolute",
                        top: "-2px",
                      },
                    }}
                    sx={{
                      svg: {
                        color: "#0B83A5",
                        height: 22,
                        width: "100%",
                        marginRight: "16px",
                      },
                      backgroundColor: "white",
                      overflow: "visible",

                      "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-input": {
                          // border: 0,
                          fontSize: 14,
                          height: "18px",
                          width: "100%",

                          borderColor: "#0B83A5",
                          overflow: "hidden",
                        },
                        "& .MuiFormLabel-root": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  />
                )}
                {...rest}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
}

export default DatePickerField;
