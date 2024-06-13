import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SearchBar from "../Common Components/FormFields/SearchBar";
import CommonButton from "../Common Components/commonbutton/CommonButton";
import InputField from "../Common Components/FormFields/InputField";
import { useForm } from "react-hook-form";
import DatePickerField from "../Common Components/FormFields/DatePickerField";
import JoditEditor from "jodit-react";
import GeneratePDF from "../Common Components/Custom Hooks/GenratePrint";

const Patient = () => {
  const [selectedChip, setSelectedChip] = useState(1);
  const contentRef = useRef();
  const cRef = useRef();
  const defaultValues = {
    petientName: "",
    perentName: "",
    residentof: "",
    dob: new Date(),
  };

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleInputChange = (inputValue) => {
    console.log("Input changed to:", inputValue);
  };

  const [content, setContent] = useState(
    "This is to certify that <b>TANAY SHINGARE</b>, <b>10m 14d</b>, son of <b>[Parent Name]</b>, resident of [Resident Of]. <br /><br /> [Enter Any Text]"
  );
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs]
  );

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      setLogs([newContent]);
    },
    [logs, setLogs]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

  const onBlur = useCallback(
    (newContent) => {
      // appendLog(newContent);
      // setContent(newContent);
    },
    [appendLog, setContent]
  );

  console.log("logs", logs);
  const dataArray = [
    {
      id: 1,
      value: "John Doe",
      label: "John Doe",
    },
    {
      id: 2,
      value: "Jane Smith",
      label: "Jane Smith",
    },
    {
      id: 3,
      value: " Doe",
      label: "John Doe",
    },
    {
      id: 4,
      value: "Smith",
      label: "Jane Smith",
    },
    {
      id: 5,
      value: "Sawant",
      label: "Jane Smith",
    },
    {
      id: 13,
      value: "Rax",
      label: "Jane Rax",
    },
  ];
  const [chips, setChips] = useState([
    {
      id: 1,
      value: "Fitness",
      label: "Fitness",
    },
    {
      id: 2,
      value: "Leave after illness",
      label: "Leave after illness",
    },
    {
      id: 3,
      value: "Leave during illness",
      label: "Leave during illness",
    },
    {
      id: 4,
      value: "Swimming",
      label: "Swimming",
    },
    {
      id: 5,
      value: "Fitness w/o Immunization",
      label: "Fitness w/o Immunization",
    },
    {
      id: 6,
      value: "Fitness adult",
      label: "Fitness adult",
    },
    {
      id: 7,
      value: "Mother Leave",
      label: "Mother Leave",
    },
    {
      id: 8,
      value: "Discharge Summary",
      label: "Discharge Summary",
    },
    {
      id: 9,
      value: "MEDICAL CERTIFICATE-COVID-19",
      label: "MEDICAL CERTIFICATE-COVID-19",
      "Mark Common": false,
    },
    {
      id: 10,
      value: "Make your Own Form",
      label: "Make your Own Form",
    },
  ]);

  const placeholder = "Search By UHID, Patient Name, Mobile No";
  const label = "Search By UHID, Patient Name, Mobile No.";
  const onSelect = async (selectedOption) => {};
  const handleClickChip = (chip) => {
    if (chip?.id === selectedChip) {
      setSelectedChip(null);
    } else {
      setSelectedChip(chip.id);
    }
  };
  const [certificateTitle, petientName, perentName, residentof, dob] = watch([
    "certificateTitle",
    "petientName",
    "perentName",
    "residentof",
    "dob",
  ]);
  const dobDate = new Date(dob).toLocaleDateString();

  const detailsList = [
    {
      name: "petientName",
      label: "Petient Name",
      value: "",
    },
    {
      name: "perentName",
      label: "Perent Name",
      value: "",
    },
    {
      name: "residentof",
      label: "Resident Of",
      value: "",
    },
  ];

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div>
      <div className="flex w-11/12 lg:w-10/12  gap-2 items-center mb-2">
        <div className="w-2/5 z-40 ">
          <SearchBar
            name="searchetuCaseSheet"
            dataArray={dataArray}
            placeholder={placeholder}
            label={label}
            handleInputChange={handleInputChange}
            onChange={onSelect}
            searchIcon={false}
          />
        </div>
      </div>
      <div className="border  p-1 rounded bg-[#EFFBFF] mt-2">
        <div className="flex justify-between  gap-3">
          <div className="gap-3 p-[6px]">
            {chips.map((chip, index) => (
              <CommonButton
                type="button"
                key={chip?.id}
                variant="outlined"
                label={chip?.value}
                onClick={() => {
                  handleClickChip(chip);
                }}
                className={` mr-2 mb-1 ${
                  chip?.id === selectedChip
                    ? "bg-[#007EA9] text-white rounded-full border"
                    : " text-black bg-white  rounded-full border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div>
          {selectedChip === 1 ? (
            <>
              <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 w-full mt-4 items-center ">
                {detailsList.map((value, index) => (
                  <div key={index} className="flex justify-between  mb-2">
                    <div className="w-full">
                      <InputField
                        key={index}
                        label={value.label}
                        name={value.name}
                        variant="outlined"
                        error={errors[value.name]}
                        type="text"
                        control={control}
                        focused={false}
                        false
                        disabled={false}
                        inputProps={{ maxLength: 20 }}
                        onKeyDown={(e) => console.log(e.key)}
                        shrink={true}
                        dontCapitalize={true}
                      />
                    </div>
                  </div>
                ))}
                <div className="-mt-[6px]">
                  <DatePickerField
                    control={control}
                    name="dob"
                    label="DOB"
                    value={new Date()}
                    size="small"
                    inputFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
              <div className="my-3">
                <hr />
              </div>

              <div>
                <div ref={cRef}>
                  <div className="font-semibold  flex justify-center mb-4">
                    MEDICAL FITNESS CERTIFICATE
                  </div>
                  <div className="mt-2">
                    <p className="text-[14px]">
                      I certify that I have examined{" "}
                      <span className="font-semibold">
                        {petientName == ""
                          ? "Petient Name"
                          : capitalizeFirstLetter(petientName)}
                      </span>
                      , son of [
                      <span className="font-semibold">
                        {perentName == ""
                          ? "Perent Name"
                          : capitalizeFirstLetter(perentName)}
                      </span>
                      ] resident of [
                      <span className="font-semibold">
                        {residentof === ""
                          ? "Resident of"
                          : capitalizeFirstLetter(residentof)}
                      </span>
                      ] and Date Of Birth{" "}
                      <span className="font-semibold">{dobDate}</span>{" "}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-[14px]">
                      Based on the clinical examination, I certify that he is in
                      normal state of health and free from any communicable or
                      non-communicable disease/illness or physical
                      defects/infirmity, which may interfere with his schooling
                      including the active outdoor activities.
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-[14px]">
                      The Immunization status and records are up-to date as per
                      Universal Immunization Programme (UIP)/ IAP Immunization
                      Schedule
                    </p>
                  </div>
                </div>
              </div>
              <div className="float-right">
                <button
                  type="button"
                  onClick={() => {
                    GeneratePDF(cRef);
                  }}
                  className="py-2 px-3 w-min rounded text-xs font-medium searchIconButton bg-customBlue text-white whitespace-nowrap"
                >
                  Print
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        {selectedChip === 10 ? (
          <>
            <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 w-full mt-4 items-center ">
              <InputField
                label="Certificate Title"
                name="certificateTitle"
                variant="outlined"
                type="text"
                control={control}
                focused={false}
                false
                disabled={false}
                inputProps={{ maxLength: 20 }}
                onKeyDown={(e) => console.log(e.key)}
                shrink={true}
                dontCapitalize={true}
              />
            </div>
            <JoditEditor
              value={content}
              config={config}
              tabIndex={1}
              onBlur={onBlur}
              onChange={onChange}
            />
            <div ref={contentRef}>
              <div className="font-semibold   flex justify-center mt-4 mb-4">
                {capitalizeFirstLetter(certificateTitle)}
              </div>
              <div>
                <div>
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: log }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="float-right">
              <button
                type="button"
                onClick={() => {
                  GeneratePDF(contentRef);
                }}
                className="py-2 px-3 w-min rounded text-xs font-medium searchIconButton bg-customBlue text-white whitespace-nowrap"
              >
                Print
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Patient;
