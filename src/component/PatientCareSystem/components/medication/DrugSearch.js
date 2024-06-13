import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import RadioField from "../../../../Common Components/FormFields/RadioField";
import InputFieldForSearch from "./InputFieldForSearch";
import AlternativeDrugList from "./common/AlternativeDrugList";
import { warningAlert } from "../../../../Common Components/Toasts/CustomToasts";
import {
  getAlternativeDrugList,
  getSearchedDrugList,
} from "../services/ETUCaseSheetService";
import DrugList from "./common/DrugList";

function DrugSearch(props) {
  const [isBrandGeneric, setIsBrandGeneric] = useState("Brand");

  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const brandOrGeneric = [
    {
      id: "Brand",
      label: "Brand",
      value: "Brand",
    },
    {
      id: "Generic",
      label: "Generic",
      value: "Generic",
    },
  ];

  useEffect(() => {
    setIsBrandGeneric(watch("brandGeneric"));
    setDataResult([]);
    setDataTest({ result: [] });
  }, [watch("brandGeneric")]);

  useEffect(() => {
    setValue("brandGeneric", "Brand");
    setIsBrandGeneric("Generic");
  }, [props.resetCount]);

  let typeDrugName = watch("typeDrugName");

  let displayTable;

  if (typeDrugName === "") {
    displayTable = false;
  } else {
    displayTable = true;
  }
  const [arrowKeyName, setArrowKeyName] = useState("");
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState({ result: [] });
  const [dataResult, setDataResult] = useState([]);
  const [dataTest, setDataTest] = useState({ result: [] });
  const [dataResultTest, setDataResultTest] = useState([]);
  const [genericId, setGenericId] = useState(null);
  const [isHidden, setIsHidden] = useState("");
  const DrugListTableElement = useRef();
  const AlternativeDrugListElement = useRef();

  const focusDrugTable = () => {
    if (DrugListTableElement.current) {
      DrugListTableElement.current.focus();
    }
  };

  const focusAlternativeDrugTable = () => {
    if (AlternativeDrugListElement.current) {
      AlternativeDrugListElement.current.focus();
    }
  };

  useEffect(() => {
    if (props.selectedRow?.highRiskMedicine === true) {
      warningAlert("Caution..! High Risk Medicine.");
    }

    if (props.selectedRow && props.selectedRow["Item Name"] !== "") {
      setIsHidden("hidden");
      setDataResult([]);
      setDataTest({ result: [] });
    }

    setValue(
      "typeDrugName",
      props.selectedRow && props.selectedRow["Item Name"]
    );
  }, [props.selectedRow && props.selectedRow]);

  useEffect(() => {
    if (genericId && genericId > 0) {
      getAlternativeDrugList(genericId).then((response) => {
        if (response) {
          setDataTest({ result: response.data.result });
        } else {
          setDataTest({ result: [] });
        }
        setDataResultTest(response.data.result);
      });
    }
  }, [genericId]);

  useEffect(() => {
    if (arrowKeyName === "Right Arrow Key") {
      focusAlternativeDrugTable();
    } else if (arrowKeyName === "Left Arrow Key") {
      focusDrugTable();
    } else if (arrowKeyName === "Enter Key Pressed") {
    }
  }, [arrowKeyName]);

  return (
    <div className="mt-2">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex  items-center w-full">
          <div className="lg:col-span-2 items-center">
            <div className="flex flex-wrap gap-2 items-center w-full">
              <div className="items-center  ">
                <RadioField
                  control={control}
                  name="brandGeneric"
                  dataArray={brandOrGeneric}
                />
              </div>
              <div className="z-10 pr-1 w-80">
                <InputFieldForSearch
                  autoComplete="off"
                  name="typeDrugName"
                  variant="outlined"
                  label="Search Drug / Medicine"
                  control={control}
                  error={errors.typeDrugName}
                  inputRef={{
                    ...register(`typeDrugName`, {
                      onChange: (e) => {
                        if (e.target.value !== "") {
                          getSearchedDrugList(
                            e.target.value,
                            isBrandGeneric,
                            1,
                            9
                          )
                            .then((response) => response.data)
                            .then((res) => {
                              if (res.result.length > 0) {
                                setGenericId(res.result[0].genericId);
                                setData({ result: res.result });
                                setDataResult(res.result);
                              } else {
                                setGenericId(null);
                                setData({ result: [] });
                                setDataResult([]);
                                setDataResultTest("");
                              }
                            });
                        } else {
                        }
                      },
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          {displayTable ? (
            <div className={`grid lg:grid-cols-2 gap-2`}>
              <div className="">
                <h1 className={`text-lg font-semibold ${isHidden}`}>
                  Drug Name
                </h1>
                <div className=" " ref={DrugListTableElement}>
                  {data.result.length > 0 && dataResult.length > 0 ? (
                    <DrugList
                      dataResult={dataResult}
                      setDataResult={setDataResult}
                      setSelectedRow={props.setSelectedRow}
                      data={data}
                      selected={selected}
                      setSelected={setSelected}
                      setArrowKeyName={setArrowKeyName}
                      arrowKeyName={arrowKeyName}
                      setGenericId={setGenericId}
                    />
                  ) : null}
                </div>
              </div>
              <div className=" rounded-md  ">
                <h1 className={`text-lg font-semibold pl-2 ${isHidden}`}>
                  Alternative Drug Name
                </h1>
                <div className="" ref={AlternativeDrugListElement}>
                  {dataTest.result.length > 0 && dataResultTest.length > 0 ? (
                    <AlternativeDrugList
                      dataResult={dataResultTest}
                      setDataResult={setDataResultTest}
                      setSelectedRow={props.setSelectedRow}
                      data={dataTest}
                      setArrowKeyName={setArrowKeyName}
                      arrowKeyName={arrowKeyName}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default DrugSearch;
