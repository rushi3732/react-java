import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, FormGroup, InputAdornment } from "@mui/material";
import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import DropdownField from "../Common Components/FormFields/DropdownField";
import InputField from "../Common Components/FormFields/InputField";
import PrintSettingLayout from "./PrintSettingLayout";
import Logo from "./logo.png";

const dataHeight = [
  { age: 23, height: 180 },
  { age: 34, height: 182 },
];

const dataWeight = [
  { age: 34, weight: 180 },
  { age: 23, weight: 182 },
];

const PrintSetting = () => {
  const [footerAlign, setFooterAlign] = useState("");
  const [gridCols, setGridCols] = useState("grid grid-cols-1");
  const [bottomMargin, setBottomMargin] = useState(0);
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const [rightMargin, setRightMargin] = useState(0);
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [medecineTemplate, setMedecineTemplate] = useState("Line");
  const [result, setResult] = useState([
    {
      औषधे: "Powder Gudlax, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "5 दिवस ",
      Instructions: "दुपारी जेवणानंतर, रात्री जेवणानंतर ",
    },
    {
      औषधे: "Sachet Vitanoma D3, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 3/4 sachets ",
      वारंवारता: "0-0-0-0",
      कालावधी: " 6 तासांनंतर",
      Instructions: "3 दिवस",
    },
    {
      औषधे: "  Syrup  Crocin 120, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "5 दिवस ",
      Instructions: "4 ml - दिवसातून तीन वेळा X 3 दिवस ",
    },
    {
      औषधे: "     Capsule Rejunex OD, [{   PARACETAMOL ( 120 Mg )},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "फक्त एक वेळा",
      Instructions: "दुपारी जेवणानंतर, रात्री जेवणानंतर ",
    },
    {
      औषधे: "     Tablet Novex-DS , [{       Novex-DS (60 mg)},{   PARACETAMOL ( 120 Mg )}]",
      प्रमाण: "     1 tablet  ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "12 तासांनंतर",
      Instructions: "3 दिवस",
    },
    {
      औषधे: "Powder Gudlax, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "5 दिवस ",
      Instructions: "दुपारी जेवणानंतर, रात्री जेवणानंतर ",
    },
    {
      औषधे: "Sachet Vitanoma D3, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 3/4 sachets ",
      वारंवारता: "0-0-0-0",
      कालावधी: " 6 तासांनंतर",
      Instructions: "3 दिवस",
    },
    {
      औषधे: "  Syrup  Crocin 120, [{LACTUEGO (10 GM)},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "5 दिवस ",
      Instructions: "4 ml - दिवसातून तीन वेळा X 3 दिवस ",
    },
    {
      औषधे: "     Capsule Rejunex OD, [{   PARACETAMOL ( 120 Mg )},{IintaGMULA MUSK(3.5 GM)}]",
      प्रमाण: " 1.0 scoop ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "फक्त एक वेळा",
      Instructions: "दुपारी जेवणानंतर, रात्री जेवणानंतर ",
    },
    {
      औषधे: "     Tablet Novex-DS , [{       Novex-DS (60 mg)},{   PARACETAMOL ( 120 Mg )}]",
      प्रमाण: "     1 tablet  ",
      वारंवारता: "0-1-1 X ",
      कालावधी: "12 तासांनंतर",
      Instructions: "3 दिवस",
    },
  ]);
  const [switchHeightChart, setSwitchHeightChart] = useState(false);
  const [switchWeightChart, setSwitchWeightChart] = useState(false);
  const [drugsAll, setDrugsAll] = useState(false);


  const handleHeightChange = () => {
    setSwitchHeightChart((prev) => !prev);
  };
  const handleWeightChange = () => {
    setSwitchWeightChart((prev) => !prev);
  };

  const handleDrugsAll = () => {
    setDrugsAll((prev) => !prev);
  };
  const headers = ["औषधे", "प्रमाण", "वारंवारता", "कालावधी", "Instructions"];

  const schema = Yup.object().shape({
    bottomMargin: Yup.number().min(0).max(10).nullable(),
    topMargin: Yup.number().min(0).max(10).nullable(),
    leftMargin: Yup.number().min(0).max(10).nullable(),
    rightMargin: Yup.number().min(0).max(10).nullable(),
  });

  const defaultValues = {
    presriptionTemplate: null,
    bottomMargin: "",
    topMargin: "",
    leftMargin: "",
    rightMargin: "",
    fontFamily: null,
    fontSize: null,
    medecineTemplate: null,
  };
  const {
    register,
    reset,
    setValue,
    watch,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });
  const initialPresription = [
    { id: 1, label: "Double Column", value: "grid grid-cols-2 gap-2 mt-2" },
    { id: 2, label: "Single Column", value: "grid grid-cols-1" },
  ];
  const initialFontSize = [
    { id: 1, label: "1", value: "text-[8px]" },
    { id: 2, label: "2", value: "text-[7px]" },
    { id: 3, label: "3", value: "text-[10px]" },
    { id: 4, label: "4", value: "text-[11px]" },
    { id: 5, label: "5", value: "text-[12px]" },
    { id: 6, label: "6", value: "text-[12px]" },
    { id: 7, label: "7", value: "text-[14px]" },
    { id: 8, label: "8", value: "text-[15px]" },
    { id: 9, label: "9", value: "text-[16px]" },
    { id: 10, label: "10", value: "text-[17px]" },
  ];

  const initialFontFamily = [
    { id: 1, label: "Open_San", value: "font-['Open_Sans']" },
    { id: 2, label: "Roboto", value: "font-['Roboto']" },
    { id: 3, label: "Arial", value: "font-['Arial']" },
    { id: 4, label: "sans-serif", value: "font-['sans-serif']" },
    { id: 5, label: "Cambria", value: "font-['Cambria']" },
    { id: 6, label: "Georgia", value: "font-['Georgia']" },
  ];
  const initialMedecineTemplate = [
    { id: 1, label: "Line ", value: "Line" },
    { id: 2, label: "Table ", value: "Table" },
  ];

  const currentPresriptionVal = watch("presriptionTemplate");
  useEffect(() => {
    setGridCols(currentPresriptionVal?.value);
  }, [currentPresriptionVal]);

  const currentFontFamily = watch("fontFamily");
  useEffect(() => {
    setFontFamily(currentFontFamily?.value);
  }, [currentFontFamily]);

  const currentFontSize = watch("fontSize");
  useEffect(() => {
    setFontSize(currentFontSize?.value);
  }, [currentFontSize]);

  const currentMedecineTemplate = watch("medecineTemplate");
  useEffect(() => {
    setMedecineTemplate(currentMedecineTemplate?.value);
  }, [currentMedecineTemplate]);

  const [
    currentTopMargin,
    currentLeftMargin,
    currentRightMargin,
    currentBottomMargin,
  ] = watch(["topMargin", "leftMargin", "rightMargin", "bottomMargin"]);
  useEffect(() => {
    setTopMargin(`${currentTopMargin}`);
    setLeftMargin(`${currentLeftMargin}`);
    setBottomMargin(`${currentBottomMargin}`);
    setRightMargin(`${currentRightMargin}`);
    console.log(
      " currentTopMargin",
      currentTopMargin,
      currentLeftMargin,
      currentRightMargin,
      currentBottomMargin
    );
  }, [
    currentTopMargin,
    currentLeftMargin,
    currentRightMargin,
    currentBottomMargin,
  ]);

  // window.addEventListener("afterprint", (self) => self.close);

  const textSizeClass = fontSize == undefined ? "text-[11px]" : fontSize;

  return (
    <div className=" grid grid-cols-2 gap-1  ">
      <div className=" pl-5 pr-5 ">
        <div>
          <h1 className="text-1xl font-semibold mb-2">Presription Template</h1>
        </div>
        <div className="grid grid-cols-3  gap-2">
          <div className="col-span-2">
            <div className="font-semibold text-[13px] mb-2">Font Family</div>
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.fontFamily}
                placeholder={"Font Family"}
                name="fontFamily"
                dataArray={initialFontFamily}
                isSearchable={true}
              />
            </div>
          </div>
          <div>
            <div className="font-semibold text-[13px] mb-2">Font Size</div>
            <div className="w-full">
              <DropdownField
                control={control}
                error={errors.fontSize}
                name="fontSize"
                placeholder="Font Size"
                dataArray={initialFontSize}
                isSearchable={true}
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="font-semibold text-[13px] mb-2">
              Presription Template
            </div>
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.presriptionTemplate}
              name="presriptionTemplate"
              currentTopMargin
              placeholder="Presription Template"
              dataArray={initialPresription}
              isSearchable={true}
            />
          </div>
        </div>
        <div>
          <div>
            <div className="font-semibold text-[13px] mb-2">
              Medecine Template
            </div>
          </div>
          <div>
            <DropdownField
              control={control}
              error={errors.medecineTemplate}
              name="medecineTemplate"
              placeholder="Medecine Template"
              dataArray={initialMedecineTemplate}
              isSearchable={true}
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 items-center gap-2">
            <div>
              <div className="flex  justify-between  items-center">
                <div className="font-semibold text-[13px] mt-1">LetterHead</div>
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel control={<Switch checked={false} />} />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between  items-center">
                <div>
                  <div className=" flex justify-start font-semibold text-[13px] mt-1">
                    Signature
                  </div>
                </div>{" "}
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel control={<Switch checked={false} />} />
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <div>
              <div className="flex  justify-between  items-center">
                <div className="font-semibold text-[13px] mt-1">
                  Height Chart
                </div>
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={switchHeightChart}
                          onChange={handleHeightChange}
                        />
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between  items-center">
                <div>
                  <div className=" flex justify-start font-semibold text-[13px] mt-1">
                    Weight Chart
                  </div>
                </div>{" "}
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={switchWeightChart}
                          onChange={handleWeightChange}
                        />
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex justify-between  items-center">
                <div>
                  <div className=" flex justify-start font-semibold text-[13px] mt-1">
                    Weight Chart
                  </div>
                </div>{" "}
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={drugsAll}
                          onChange={handleDrugsAll}
                        />
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="font-semibold text-[13px] mb-2">Pepar Size</div>
          <div className=" grid gap-2 grid-cols-2">
            <div>
              <div className="font-semibold text-[11px] mb-2">Top Margin</div>
              <InputField
                name="topMargin"
                variant="outlined"
                label="Top Margin"
                error={errors.topMargin}
                control={control}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Cm</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-[11px] mb-2">
                Bottom Margin
              </div>
              <InputField
                name="bottomMargin"
                variant="outlined"
                label="Bottom Margin"
                error={errors.bottomMargin}
                control={control}
              />
            </div>
          </div>

          <div className=" grid gap-2 grid-cols-2">
            <div>
              <div className="font-semibold text-[11px] mb-2">Left Margin</div>
              <InputField
                name="leftMargin"
                variant="outlined"
                label="Left Margin"
                error={errors.leftMargin}
                control={control}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Cm</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-[11px] mb-2">Right Margin</div>
              <InputField
                name="rightMargin"
                variant="outlined"
                label="Right Margin"
                error={errors.rightMargin}
                control={control}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="font-semibold text-[13px] mt-1">
                Footer Alignment
              </div>
            </div>
            <div className="mt-2">
              <div
                className="inline-flex shadow-sm rounded-md mb-5"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => {
                    setFooterAlign("text-left");
                  }}
                  className={`${footerAlign === "text-left"
                      ? "bg-gray-100text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700"
                      : ""
                    } rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-1 text-gray-900
                   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                >
                  Left
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFooterAlign("text-right");
                  }}
                  className={`${footerAlign === "text-right"
                      ? "bg-gray-100 text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700"
                      : ""
                    } rounded-r-md border border-gray-200 bg-white text-sm font-medium px-4 py-1 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                >
                  Right
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={` border  border-black  rounded ${fontFamily}`}>
        <div className="">
          <PrintSettingLayout
            topMargin={topMargin}
            drugsAll={drugsAll}
            rightMargin={rightMargin}
            bottomMargin={bottomMargin}
            leftMargin={leftMargin}
            textSizeClass={textSizeClass}
            gridCols={gridCols}
            medecineTemplate={medecineTemplate}
            headers={headers}
            result={result}
            switchHeightChart={switchHeightChart}
            dataHeight={dataHeight}
            switchWeightChart={switchWeightChart}
            dataWeight={dataWeight}
            footerAlign={footerAlign}
            Logo={Logo}
          />
        </div>
      </div>
    </div>
  );
};

export default PrintSetting;
