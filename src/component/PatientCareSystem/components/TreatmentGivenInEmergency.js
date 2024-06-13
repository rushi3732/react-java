import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const TreatmentGivenInEmergency = () => {
  const { control } = useFormContext();
  return (
    <div>
      <div className="rounded border h-60">
        <div className="bg-[#C6CCFF] sticky top-0   p-[7px] border shadow">
          <div className="text-sm font-semibold w-full ml-2">
            Treatment Given In Emergency
          </div>
        </div>

        <div className="p-2   bg-white">
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
                    name="treatmentInEmergency"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-multiline-flexible"
                        label="Treatment Given In Emergency"
                        multiline
                        minRows={5}
                        maxRows={5}
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

export default TreatmentGivenInEmergency;
