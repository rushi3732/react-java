import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const InjuryDetails = () => {
  const { control } = useFormContext();
  return (
    <div>
      {" "}
      <div className="rounded border">
        <div className="bg-[#FCE7F3]  p-[7px] border shadow-md">
          <div className="text-sm font-semibold w-full ml-2">
            Injury Details{" "}
          </div>
        </div>
        <div className="p-2 h-50 bg-white">
          <div className="flex justify-between  w-full">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className="w-full  mr-4"
            >
              <div>
                <Controller
                  name="injuryDetails"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-multiline-flexible"
                      label="Add Injury Examination"
                      multiline
                      minRows={6}
                      maxRows={6}
                      className="w-full"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InjuryDetails