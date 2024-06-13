import React from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputFieldForSearch = ({
  sx,
  variant,
  defaultValue,
  inputProps,
  type,
  disabled,
  inputRef,
  name,
  label,
  error,
  control,
  dontCapitalize,
  onFocus,
  autoFocus,
  ref,
  focused,
  autoComplete,
  isFocused,
  onKeyDown,
  shrink,
}) => {
  return (
    <FormControl fullWidth size="small" sx={sx}>
      <Controller
        render={({ field }) => (
          <TextField
            isFocused={isFocused}
            autoComplete={autoComplete}
            focused={focused}
            onFocus={onFocus}
            autoFocus={autoFocus}
            className="h-10 text-sm bg-white"
            inputRef={inputRef}
            onKeyDown={onKeyDown}
            ref={ref}
            inputProps={
              dontCapitalize
                ? (inputProps,
                  {
                    style: {
                      fontSize: "14px",
                      height: "18.5px",
                    },
                  })
                : (inputProps,
                  {
                    style: {
                      textTransform: "capitalize",
                      fontSize: "14px",
                      height: "18.5px",
                    },
                  })
            }
            sx={
              shrink
                ? {
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                  }
                : {
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                      position: "absolute",
                      top: "-2px",
                    },
                    fontSize: "14px",
                  }
            }
            type={type}
            disabled={disabled}
            error={!!error?.message}
            variant={variant}
            label={label}
            placeholder={label}
            name={name}
            fullWidth
            shrink={false}
            {...field}
            size="small"
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {/* <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText> */}
    </FormControl>
  );
};

export default InputFieldForSearch;
