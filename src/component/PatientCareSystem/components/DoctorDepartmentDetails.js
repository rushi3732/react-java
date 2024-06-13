import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as yup from "yup";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import { errorAlert } from "../../../Common Components/Toasts/CustomToasts";
import { getDepartment, getDoctors } from "./services/ETUCaseSheetService";

const DoctorDepartmentDetails = () => {
  const [departmentDoctorList, setDepartmentDoctorList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [errorDoctorDetails, setErrorDoctorDetails] = useState("invisible");
  const [doctorDataArr, setDoctorDataArr] = useState([]);
  const [duplicate, setDuplicate] = useState(false);

  let schema = yup.object().shape({
    doctorDetails: yup.array().of(
      yup.object().shape({
        department: yup
          .object()
          .nullable()
          .shape({
            value: yup.string().required("Please Select Department"),
            label: yup.string().required("Please Select Department"),
          })
          .required("Please Select Department"),

        doctor: yup
          .object()
          .nullable()
          .when("department", (department) => {
            if (department !== null) {
              return yup
                .object()
                .nullable()
                .shape({
                  value: yup.string().required("Please Select Doctor"),
                  label: yup.string().required("Please Select Doctor"),
                })
                .required("Please Select Doctor");
            }
          })
          .notRequired("Please Select Doctor"),
      })
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useFormContext({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      doctorDetails: [{ department: null, doctor: null }],
      reference: "",
      otBooked: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctorDetails",
  });

  let departmentDetails, doctorsDetail;

  let doctorDetailsData = watch("doctorDetails");

  useEffect(() => {
    console.log("doctorDetailsData", doctorDetailsData);
  }, [doctorDetailsData]);

  useEffect(() => {
    doctorDetailsData.map((item) => {
      console.log("doctorDetailsData", doctorDetailsData);
      departmentDetails = item.department;
      doctorsDetail = item.doctor;
    });
  }, [doctorId]);

  const handleChangeDepartment = (e) => {
    getDepartment(e)
      .then((res) => res.data.result)
      .then((res) => {
        setDepartmentList(res);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  };

  const handleChangeDoctor = (e) => {
    getDoctors(departmentId)
      .then((res) => res.data.result)
      .then((res) => {
        setDoctorList(res);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
  };

  const seen = {};
  const duplicates = [];
  const handleCheckDuplicate = () => {
    for (let i = 0; i < doctorDetailsData.length; i++) {
      const value = JSON.stringify(doctorDetailsData[i]);
      if (seen[value]) {
        duplicates.push(doctorDetailsData[i]);
      } else {
        seen[value] = true;
      }
    }
    console.log("Duplicates", duplicates);
    if (duplicates.length > 0) {
      setDuplicate(true);
    } else {
      setDuplicate(false);
    }
  };

  return (
    <div>
      <div className="rounded border bg-white h-60">
        <div className="bg-[#FFD9D4] sticky top-0  p-1 border shadow">
          <div className="text-sm font-semibold w-full ml-2">
            Doctor/Department Details
          </div>
        </div>

        <div className=" p-2 bg-white">
          <div className="w-full">
            {fields.map((item, index) => {
              return (
                <div className="grid grid-cols-2 gap-2" key={item.id}>
                  <div className="mb-2 ">
                    <SearchDropdown
                      control={control}
                      searchIcon={false}
                      name={`doctorDetails[${index}].department`}
                      label="Department"
                      dataArray={departmentList}
                      isSearchable={true}
                      placeholder="Department"
                      handleInputChange={handleChangeDepartment}
                      inputRef={{
                        ...register(`doctorDetails[${index}].department`, {
                          onChange: (e) => {
                            if (e.target.value !== null) {
                              setDepartmentId(e.target.value.id);
                            } else {
                              setDepartmentId(null);
                            }
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="flex w-11/12 mb-2 ">
                    <div className="w-full">
                      <SearchDropdown
                        control={control}
                        searchIcon={false}
                        name={`doctorDetails[${index}].doctor`}
                        label="Doctor"
                        dataArray={doctorList}
                        isSearchable={true}
                        placeholder="Doctor"
                        isClearable={true}
                        handleInputChange={handleChangeDoctor}
                        inputRef={{
                          ...register(`doctorDetails[${index}].doctor`, {
                            onChange: (e) => {
                              if (e.target.value !== null) {
                                setDoctorId(e.target.value.value);
                                doctorDataArr.push(e.target.value.value);
                                handleCheckDuplicate();
                              } else {
                                setDoctorId(null);
                              }
                            },
                          }),
                        }}
                      />
                    </div>
                    <div className="flex mx-2 ">
                      {fields.length !== 1 && (
                        <RemoveOutlinedIcon
                          className="mt-2 rounded-full border-2 border-red-600"
                          onClick={() => {
                            remove(index);
                            doctorDataArr.pop();
                            if (index !== fields.length - 1) {
                              setValue(
                                `doctorDetails[${index}].department`,
                                null
                              );
                              setValue(`doctorDetails[${index}].doctor`, null);
                            }
                            doctorDetailsData.map((item) => {
                              if (item.internalReferenceDoctor !== "") {
                              }
                            });
                          }}
                        />
                      )}
                      {fields.length - 1 === index && (
                        <AddOutlinedIcon
                          className="mt-2 mx-1  rounded-full border-2 border-cyan-600"
                          onClick={(index) => {
                            let validData = true;
                            let isDuplicate;
                            for (let item of doctorDetailsData) {
                              if (
                                item.department !== null &&
                                item.doctor !== null
                              ) {
                                validData = true;
                              } else {
                                validData = false;
                              }
                            }
                            handleCheckDuplicate();
                            if (validData && duplicates.length === 0) {
                              append({ department: null, doctor: null });
                            } else {
                              trigger(["doctorDetails"]);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {duplicate ? (
              <p className="text-xs text-red-500">Doctor is Already </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDepartmentDetails;
