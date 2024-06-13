import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const SurgicalHistory = ({ heightSH }) => {
  const { control, handleSubmit } = useFormContext();
  return (
    <div>
      <div className="rounded border ">
        <div className="bg-[#ECFCCB]  sticky  p-[7px] border  shadow-md flex justify-between">
          <div className="flex items-center">
            <div className="text-sm font-semibold flex items-center justify-start whitespace-nowrap ml-2">
              Surgical History
            </div>
          </div>
        </div>
        <div
          className={`${
            heightSH != "h-[192px]" ? `${heightSH}` : "h-[192px]"
          } p-2 bg-white`}
        >
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
                <div>
                  <Controller
                    name="surgicalHistory"
                    className="h-32"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-multiline-flexible"
                        label="Add Surgical Examination"
                        multiline
                        minRows={heightSH === "h-[228px]" ? 7 : 5}
                        maxRows={heightSH === "h-[228px]" ? 7 : 5}
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

export default SurgicalHistory;
