import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
const LocalExamination = () => {
  const { control } = useFormContext();
  return (
    <div>
      <div className="rounded border">
        <div className="bg-[#DBEAFE]   p-[7px] border shadow">
          <div className="text-sm font-semibold w-full ml-2">
            Local Examination
          </div>
        </div>
        <div className="p-2 h-24  bg-white">
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
                  name="localExamination"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-multiline-flexible"
                      label="Add Local Examination"
                      multiline
                      minRows={2}
                      maxRows={2}
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

export default LocalExamination;
