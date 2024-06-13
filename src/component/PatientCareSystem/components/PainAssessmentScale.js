import { Tooltip, styled } from "@mui/material";
import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { warningAlert } from "../../../Common Components/Toasts/CustomToasts";
import {
  PainAssessmentScaleSVG,
  ViewIcon
} from "../../../Common Components/assets/commonassets/CommonAssets";

const PainAssessmentScale = (props) => {
  const {
    setPainScoreDetails,
    sliderReset,
    setSliderReset,
    painScore,
    setPainScore,
  } = props;

  const [painDescription, SetPainDescription] = useState("No Pain");
  const sliderMarks = [
    {
      value: 0,
      scaledValue: 0,
    },
    {
      value: 1,
      scaledValue: 1,
    },
    {
      value: 2,
      scaledValue: 2,
    },
    {
      value: 3,
      scaledValue: 3,
    },
    {
      value: 4,
      scaledValue: 4,
    },
    {
      value: 5,
      scaledValue: 5,
    },
    {
      value: 6,
      scaledValue: 6,
    },
    {
      value: 7,
      scaledValue: 7,
    },
    {
      value: 8,
      scaledValue: 8,
    },
    {
      value: 9,
      scaledValue: 9,
    },
    {
      value: 10,
      scaledValue: 10,
    },
  ];

  const painScoreList = [
    {
      id: 0,
      score: 0,
      value: "No Pain",
    },
    {
      id: 1,
      score: 1,
      value: "Mild Pain",
    },
    {
      id: 2,
      score: 2,
      value: "Mild Pain",
    },
    {
      id: 3,
      score: 3,
      value: "Mild Pain",
    },
    {
      id: 4,
      score: 4,
      value: "Moderate Pain",
    },
    {
      id: 5,
      score: 5,
      value: "Moderate Pain",
    },
    {
      id: 6,
      score: 6,
      value: "Severe Pain",
    },
    {
      id: 7,
      score: 7,
      value: "Severe Pain",
    },
    {
      id: 8,
      score: 8,
      value: "Very Severe Pain",
    },
    {
      id: 9,
      score: 9,
      value: "Very Severe Pain",
    },
    {
      id: 10,
      score: 10,
      value: "Worst Pain Possible",
    },
  ];

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();

  function valueText(value) {
    return `${value}°C`;
  }

  const CustomSlider = styled(Slider)({
    color: "#52af77",
    height: 8,
    padding: 7,

    "& .MuiSlider-mark": {
      border: "none",
      color: "gray",
      height: 7,
    },
    "& .MuiSlider-rail": {
      border: "none",
      backgroundImage:
        "linear-gradient(.25turn,  lightblue, green, greenyellow, yellow, orange, red)",
    },
    "& .MuiSlider-track": {
      border: "none",
      backgroundImage:
        "linear-gradient(.25turn,  lightblue, green, greenyellow, yellow, orange, red)",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid blue",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "black",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const handleSliderChange = (value) => {
    const selectedPainScore = findPainScore(value);
    if (selectedPainScore) {
      setPainScore(selectedPainScore.score);
      SetPainDescription(selectedPainScore.value);
      setPainScoreDetails({
        painScore: selectedPainScore.score,
        painDescription: selectedPainScore.value,
      });
    } else {
      warningAlert("No matching score found");
    }
    setSliderReset(value);
  };

  const findPainScore = (score) => {
    return painScoreList.reduce(
      (found, item) => (item.score === score ? item : found),
      null
    );
  };

  return (
    <div className="rounded  border">
      <div className=" sticky top-0   bg-[#FFE4E6]  p-[7px] border shadow-md">
        <div className="flex justify-between">
          <div className="text-sm font-semibold ml-2">
            Pain Assessment Scale
          </div>
          <Tooltip title="View" placement="left" arrow>
            <button
              type="button"
              className="text-blue-500 mr-1 flex justify-end"
            >
              <ViewIcon />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className=" ">
        <div className=" mx-2">
          <PainAssessmentScaleSVG />
          <div className="mr-7   ml-14 mt-4 ">
            <div className="flex w-full justify-start mt-2">
              <div className="w-[92%] xl:w-[90% ] 2xl:w-[91%] ml-4 lg:ml-5 2xl:ml-8">
                <CustomSlider
                  className="painScore"
                  control={control}
                  {...register("painScore")}
                  name="painScore"
                  onChange={(value) => {
                    handleSliderChange(value.target.value);
                  }}
                  aria-label="Custom marks"
                  value={sliderReset !== null ? sliderReset : 0}
                  getAriaValueText={valueText}
                  min={0}
                  step={1}
                  max={10}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                  style={{ height: "14px" }}
                  marks={sliderMarks}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-5">
            <div className="flex gap-2">
              <p className="font-semibold whitespace-nowrap">Pain Score :</p>
              <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                {painScore}
              </p>
              <p className="font-semibold whitespace-nowrap">
                {" "}
                {painDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainAssessmentScale;
