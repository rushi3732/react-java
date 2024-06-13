import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const SpecialInstruction = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div className="rounded border">
        <div className="bg-[#C6CCFF] sticky top-0   p-[7px] border shadow">
          <div className="text-sm font-semibold w-full ml-2">
            Special Instruction{" "}
          </div>
        </div>

        <div className="p-2  h-46 bg-white">
          <div className="flex justify-between mb-2">
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
                <div className="">
                  <Controller
                    name="specialInstruction"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-multiline-flexible"
                        label="Add Special Instruction"
                        multiline
                        minRows={2.5}
                        maxRows={2.5}
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
    </div>
  );
};

export default SpecialInstruction;
