import React, { useState } from "react";
import CommonTransactionPaginationTable from "../../Common Components/CommonTable/CommonTransactionPaginationTable";
import DropdownField from "../../Common Components/FormFields/DropdownField";
import CommonButton from "../../Common Components/commonbutton/CommonButton";
import { useForm } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import CancelPresentationIconButton from "../../Common Components/Buttons/CancelPresentationIconButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const TariffServiceDescription = () => {
  const schema = Yup.object().shape({
    files: Yup.array().of(
      Yup.mixed()
        .required("Please select at least one file")
        .test(
          "fileType",
          "Invalid file type, only Excel files are allowed",
          (value) => {
            if (!value) return true; // If no files are selected, return true
            return value.every((file) => {
              return [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
              ].includes(file.type);
            });
          }
        )
    ),
  });

  const [cghfList, setCgHFList] = useState([
    {
      id: 1,
      value: "Food Allergy",
      label: "Food Allergy",
      "Mark Common": false,
    },
    {
      id: 2,
      value: "Anaphylaxis",
      label: "Anaphylaxis",
      "Mark Common": true,
    },
    {
      id: 3,
      value: "Drug Allergy",
      label: "Drug Allergy",
      "Mark Common": false,
    },
    {
      id: 4,
      value: "Wheezing or other breathing problems",
      label: "Wheezing or other breathing problems",
      "Mark Common": true,
    },
    {
      id: 5,
      value: "Itching",
      label: "Itching",
      "Mark Common": false,
    },
    {
      id: 6,
      value: "Grass and Tree Pollen",
      label: "Grass and Tree Pollen",
      "Mark Common": true,
    },
    {
      id: 7,
      value: "Animal Dander",
      label: "Animal Dander",
      "Mark Common": false,
    },
    {
      id: 8,
      value: "Chip 8",
      label: "Chip 8",
      "Mark Common": true,
    },
    {
      id: 9,
      value: "Chip 9",
      label: "Chip 9",
      "Mark Common": false,
    },
    {
      id: 10,
      value: "Chip 10",
      label: "Chip 10",
      "Mark Common": false,
    },
    {
      id: 11,
      value: "Chip 11",
      label: "Chip 11",
      "Mark Common": false,
    },
    {
      id: 12,
      value: "Chip 12",
      label: "Chip 12",
      "Mark Common": false,
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataResult = [
    {
      id: 1,
      ServiceId: 234,
      ServiceCode: "Test1233",
      "Service Descrebtion": "Tesring",
    },
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDataSubmit = () => {
    closeModal();
  };
  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const selectedFiles = watch("files");

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      setValue("files", Array.from(fileList));
    } else {
      setValue("files", null);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };
  return (
    <div>
      <div className=" grid grid-cols-4 gap-2">
        <div className=" col-span-1">
          <DropdownField
            control={control}
            error={errors.cghf}
            name="cghf"
            placeholder="CGHF"
            dataArray={cghfList}
            isClearable={true}
            isSearchable={true}
          />
        </div>
        <div className="col-span-3 flex  justify-end">
          <CommonButton
            type="button"
            label="Upload"
            onClick={openModal}
            className="px-3 py-[5px] my-auto rounded-md bg-customBlue text-white text-sm"
            disabled={false}
            searchIcon={false}
          />
        </div>
      </div>
      <CommonTransactionPaginationTable
        dataResult={dataResult}
        removeHeaders={["actions"]}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        count={count}
        tableClass="h-[120px] -mt-[7px] -mb-2"
        renderActions={false}
        highlightRow={false}
        rowBackgroundColor={(row, index) => {
          return index % 2 === 0 ? "bg-gray-300" : "bg-white";
        }}
        handleSelectedRow={(row, index) => {
          console.log("Selected Row:", row, "Index:", index);
        }}
        editableColumns={[""]}
        SelectCheckbox={false}
      />
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        onClose={closeModal}
      >
        <Box
          style={{ width: "40%" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 bg-background-paper border bg-white border-gray-300 rounded shadow-md p-4"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 items-center mb-3">
              <div className="flex font-bold justify-start">
                Upload Tariff Code
              </div>
              <div className="justify-end mr-2">
                <CancelPresentationIconButton onClick={closeModal} />
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-1">
                <div>
                  <DropdownField
                    control={control}
                    error={errors.tariff}
                    name="tariff"
                    placeholder="Tariff"
                    dataArray={cghfList}
                    isClearable={true}
                    isSearchable={true}
                  />
                </div>
                <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="input_field flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        {...register("files")}
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        accept=".xlsx, .xls"
                        multiple
                        onChange={handleFileChange}
                      />
                      <div className="text bg-teal-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-teal-500">
                        Browse Excel File
                      </div>
                    </label>
                    {errors.files && (
                      <span className="text-red-500">
                        {errors.files.message}
                      </span>
                    )}
                    <div className="title text-black  font-semibold uppercase">
                      {selectedFiles && selectedFiles.length > 0
                        ? selectedFiles.map((file, index) => (
                            <div key={index}>{file.name}</div>
                          ))
                        : "No file selected"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2 mb-2"></div>
                <div className="flex justify-end gap-2">
                  <CommonButton
                    label="Upload"
                    type="submit"
                    onClick={() => handleDataSubmit()}
                    className="saveButton bg-[#073763] text-white"
                  />
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TariffServiceDescription;
