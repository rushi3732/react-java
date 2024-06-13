import React, { useState, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../Common Components/FormFields/InputField";
import { Box, Modal, TableContainer, Typography } from "@mui/material";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import RadioField from "../../../Common Components/FormFields/RadioField";
import Pews from "./PEWS";

const GeneralExaminationData = [
  { name: "saturationWithO2", label: "Saturation With O2 (%)" },
  {
    name: "saturationWithoutO2",
    label: "Saturation Without 02 (%)",
  },
  { name: "oxygenPerMin", label: "Oxygen Rate Per Min" },
];
const GeneralExamination = ({
  isPatientAgeBelow14,
  setGeneralDetails,
  gcsScore,
  setGCSScore,
  pewsScore,
  setPEWSScore,
}) => {
  const [eyeOpeningResponse, setEyeOpeningResponse] = useState(0);
  const [verbalResponse, setVerbalResponse] = useState(0);
  const [motorResponse, setMotorResponse] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPEWSModalOpen, setPEWSIsModalOpen] = useState(false);
  const [gcsData, setGCSData] = useState(0);
  const eyeOpeningOptions = [
    { id: 1, label: "None (1)", value: 0 },
    { id: 2, label: "To Pain (2)", value: 0 },
    { id: 3, label: "To Verbal Stimuli (3)", value: 0 },
    { id: 4, label: "Spontaneous (4)", value: 0 },
  ];
  const avpuOptions = [
    { id: 1, label: "A", value: 0 },
    { id: 2, label: "V", value: 0 },
    { id: 3, label: "P", value: 0 },
    { id: 4, label: "U", value: 0 },
  ];
  const verbalOptions = [
    { id: 1, label: "None (1)    ", value: 0 },
    { id: 2, label: "Incoherent (2)", value: 0 },
    { id: 3, label: "Inappropriate Words (3)", value: 0 },
    { id: 4, label: "Confused (4)", value: 0 },
    { id: 5, label: "ET Tube in Situ (T)", value: 0 },
  ];
  const motorOptions = [
    { id: 1, label: "None (1) ", value: 0 },
    { id: 2, label: "Extension to Pain or Decerebrate (2)", value: 0 },
    { id: 3, label: "Flexion To Pain or Decorticate (3)", value: 0 },
    { id: 4, label: "Withdraws From Pain (4)", value: 0 },
    { id: 5, label: "Localizes Pain (5)", value: 0 },
    { id: 6, label: " Obeys Commands (6)", value: 0 },
  ];

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const [
    playingAppropriate,
    sleeping,
    irritable,
    reducedResponseToPain,
    lethargicConfused,
  ] = watch([
    "playingAppropriate",
    "sleeping",
    "irritable",
    "reducedResponseToPain",
    "lethargicConfused",
  ]);

  useEffect(() => {
    createObject();
  }, [pewsScore]);

  useEffect(() => {
    setMotorResponse(watch("motorOptions"));
    setVerbalResponse(watch("verbalOptions"));
    setEyeOpeningResponse(watch("eyeOpeningOptions"));
    createObject();
  }, [
    watch("motorOptions"),
    watch("verbalOptions"),
    watch("eyeOpeningOptions"),
  ]);
  
  function createObject() {
    setGeneralDetails({
      gcsEye: parseInt(eyeOpeningResponse),
      gcsVerbal: parseInt(verbalResponse),
      gcsMotor: parseInt(motorResponse),
      gcsScore: gcsScore,
      pews: pewsScore,
    });
  }

  useEffect(() => {
    let newBehaviorScore = 0;
    if (playingAppropriate) newBehaviorScore = 0;
    if (sleeping) newBehaviorScore = 1;
    if (irritable) newBehaviorScore = 2;
    if (reducedResponseToPain || lethargicConfused) newBehaviorScore = 3;
  }, [
    playingAppropriate,
    sleeping,
    irritable,
    reducedResponseToPain,
    lethargicConfused,
  ]);
  const [avpu, setavpu] = useState("A");
  const mewsScore = 4;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let calculateGCS;
  useEffect(() => {
    calculateGCS =
      parseInt(eyeOpeningResponse) +
      parseInt(verbalResponse) +
      parseInt(motorResponse);
    setGCSData(calculateGCS);
  }, [eyeOpeningResponse, verbalResponse, motorResponse]);

  const handleEyeOpeningResponseChange = (event) => {
    setEyeOpeningResponse(event.target.value);
  };

  const openPEWSModal = () => {
    setPEWSIsModalOpen(true);
  };

  const closePEWSModal = () => {
    setPEWSIsModalOpen(false);
  };
  return (
    <form>
      <div className="rounded border">
        <div className="bg-[#CCFBF1]  sticky top-0  p-[7px] border shadow">
          <div className="text-sm font-semibold w-full ml-2">
            General Examination
          </div>
        </div>
        <TableContainer
          square={true}
          elevation={1}
          sx={{
            "&::-webkit-scrollbar": {
              width: 7,
              height: 10,
              marginY: "4px",
              overflowY: "auto",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              padding: "2px !important",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f8fafc",
              borderRadius: "0.25rem",
              padding: "2px !important",
            },
          }}
          className="rounded  h-48"
        >
          <div className="p-2">
            <div>
              <div className="grid mt-3 grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                {GeneralExaminationData.map((value, index) => (
                  <InputField
                  key={index}
                    control={control}
                    label={value.label}
                    name={value.name}
                    disabled={false}
                    variant="outlined"
                    inputProps={{ maxLength: 20 }}
                    shrink={true}
                    type="number"
                    defaultValue={value.name}
                    error={errors[value.name]}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-2">
              <div className="lg:border-r-2 border-slate-300 my-2  sm:mx-auto">
                <div className="flex justify-between h-full my-auto">
                  <CommonButton
                    type="button"
                    label="GCS"
                    onClick={openModal}
                    className="px-3 py-[5px] text-xs text-center my-auto rounded-md bg-customBlue  text-white "
                    disabled={false}
                    searchIcon={false}
                  />
                  <div className="flex mx-4   my-auto">
                    <p className="font-semibold mx-4 whitespace-nowrap">
                      GCS Score
                    </p>
                    <p className="bg-red-500 mr-2 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                      {gcsScore}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-slate-300 my-2 mx-1 sm:mx-auto">
                <div className="flex justify-between h-full my-auto">
                  <CommonButton
                    type="button"
                    label="PEWS"
                    onClick={openPEWSModal}
                    className="px-3 py-[5px] my-auto rounded-md bg-customBlue text-white text-sm"
                    disabled={false}
                    searchIcon={false}
                  />
                  <div className="flex mx-4 my-auto">
                    <p className="font-semibold mx-4">PEWS</p>
                    <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                      {pewsScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TableContainer>
        <Modal
          open={isModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closeModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={ModalStyle} style={{ width: "70vw", maxWidth: "820px" }}>
            <div className=" flex  justify-between items-center">
              <div className=" flex  font-bold justify-start -mt-4">
                GCS Calculator
              </div>
              <div>
                <CancelPresentationIconButton onClick={closeModal} />
              </div>
            </div>
            <div className="">
              <div className=" flex  justify-between items-center  gap-6 mt-2 "></div>
              <div className=" ml-1 mt-2 grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3   gap-2">
                <fieldset className="border-2 rounded font-bold border-gray-200  p-2">
                  <legend className="md:mx-2 md:px-2 lg:px-2 text-sm whitespace-nowrap">
                    Eye Opening Response
                  </legend>
                  <div className="mx-2 w-32">
                    <RadioField
                      dataArray={eyeOpeningOptions}
                      name="eyeOpeningOptions"
                      control={control}
                      onChange={handleEyeOpeningResponseChange}
                    />
                  </div>
                </fieldset>
                <fieldset className="border-2 rounded font-bold border-gray-200  p-2">
                  <legend className="md:mx-2 md:px-2 lg:px-2 text-sm whitespace-nowrap">
                    Verbal Response
                  </legend>
                  <div className="mx-2 w-32">
                    <RadioField
                      dataArray={verbalOptions}
                      name="verbalOptions"
                      control={control}
                      onChange={(e) => {
                        setVerbalResponse(e.target.value);
                      }}
                    />
                  </div>
                </fieldset>
                <fieldset className="border-2 rounded font-bold border-gray-200  p-2">
                  <legend className=" md:mx-2 md:px-2 lg:px-2 text-sm whitespace-nowrap">
                    Motor Response
                  </legend>
                  <div className="mx-2 w-36">
                    <RadioField
                      dataArray={motorOptions}
                      name="motorOptions"
                      control={control}
                      onChange={(e) => {
                        setMotorResponse(e.target.value);
                      }}
                    />
                  </div>
                </fieldset>
              </div>
              <div className="mt-3 flex justify-between items-center  ">
                <div className="flex  items-center justify-start  gap-2">
                  <div className="flex gap-2">
                    <p className="font-semibold whitespace-nowrap">GCS Score</p>
                    <p className="bg-red-500 text-white font-semibold rounded-full w-7 h-7 text-center pt-0.5">
                      {gcsData}
                    </p>
                  </div>
                  <div>
                    <fieldset className="border-2 rounded border-green-500  ">
                      <legend className="  md:mx-2 md:px-2 lg:px-2 text-sm whitespace-nowrap text-green-500">
                        Alert
                      </legend>
                      <div className="font-semibold px-2 text-green-500 text-sm">
                        No Need to Call Doctor For Consultation
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className=" flex justify-end">
                  <CommonButton
                    type="button"
                    label="Save"
                    onClick={() => {
                      setGCSScore(gcsData);
                      closeModal();
                      createObject();
                    }}
                    className="h-9 px-3 w-min rounded text-sm font-medium searchIconButton bg-[#4CAF50] text-white whitespace-nowrap"
                    disabled={false}
                    searchIcon={false}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={isPEWSModalOpen}
          aria-labelledby="modal-modal-title"
          onClose={closePEWSModal}
        >
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: 7,
                height: 10,
                marginY: "4px",
                overflowY: "auto",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d1d5db",
                borderRadius: "0.25rem",
                padding: "2px !important",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f8fafc",
                borderRadius: "0.25rem",
                padding: "2px !important",
              },
            }}
            className=" h-[90%] 2xl:h-auto 2xl:w-[70%] w-[70%]  overflow-clip   overflow-y-auto   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300   p-4"
          >
            {" "}
            <div className="grid grid-cols-2 items-center  mb-3">
              <div className="flex font-bold justify-start">
                PEWS Calculator
              </div>
              <div className="justify-end">
                <CancelPresentationIconButton onClick={closePEWSModal} />
              </div>
            </div>
            <Pews setPEWSScore={setPEWSScore} closePEWSModal={closePEWSModal} />
          </Box>
        </Modal>
      </div>
    </form>
  );
};

export default GeneralExamination;
