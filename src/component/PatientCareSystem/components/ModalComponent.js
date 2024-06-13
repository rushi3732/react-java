import { Box, Modal } from "@mui/material";
import React from "react";
import CancelPresentationIconButton from "../../../Common Components/Buttons/CancelPresentationIconButton";
import CommonTransactionTable from "../../../Common Components/CommonTable/CommonTransactionTable";
import SearchDropdown from "../../../Common Components/FormFields/searchDropdown";
import { ModalStyle } from "../../../Common Components/ModalStyle";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";

const ModalComponent = ({
  isModalOpen,
  closeModal,
  removeHeaders,
  handleInputChange,
  dataArray,
  placeholder,
  isClearable,
  label,
  onChange,
  handleSearchClick,
  dataResult,
  renderInput,
  modalTitle,
  name,
  control,
  errors,
}) => {
  return (
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
      <Box sx={ModalStyle} style={{ width: "70vw", maxWidth: "520px" }}>
        <div className="flex justify-between items-center">
          <div className="flex font-bold justify-start -mt-4">{modalTitle}</div>
          <div>
            <CancelPresentationIconButton onClick={closeModal} />
          </div>
        </div>
        <div className="-mr-2">
          <div className="flex justify-between items-center gap-2 mt-2">
            <SearchDropdown
              dataArray={dataArray}
              placeholder={placeholder}
              handleInputChange={handleInputChange}
              isClearable={isClearable}
              name={name}
              control={control}
              error={errors}
              label={label}
              onChange={onChange}
              searchIcon={false}
              isSearchable={true}
            />
            <div className="">
              <CommonButton
                type="button"
                label={<searchIcon />}
                onClick={handleSearchClick}
                className="h-9 px-3 w-min rounded text-sm font-medium searchIconButton bg-customBlue text-white whitespace-nowrap"
                disabled={false}
                searchIcon={true}
              />
            </div>
          </div>
          {dataResult?.length > 0 ? (
            <div className="ml-1 mt-[7px]">
              <CommonTransactionTable
                dataResult={dataResult}
                removeHeaders={removeHeaders}
                tableClass={"max-h-52"}
                renderInput={renderInput}
                highlightRow={false}
                rowBackgroundColor={(row, index) =>
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                }
                handleSelectedRow={(row, index) => {
                  console.log("Selected Row:", row, "Index:", index);
                }}
                editableColumns={["Mark Common"]}
                SelectCheckbox={true}
              />
            </div>
          ) : (
            ""
          )}{" "}
          <div className="flex justify-end mt-2">
            <CommonButton
              type="button"
              label="Save"
              onClick={closeModal}
              className="h-9 px-3 w-min rounded text-sm font-medium searchIconButton bg-[#4CAF50] text-white whitespace-nowrap"
              disabled={false}
              searchIcon={false}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
