import React, { useState, useEffect } from "react";
import CommonDynamicTablePaginationNew from "./CommonDynamicTablePagination";
import LoadingSpinner from "./loading/LoadingSpinner";
import { FaEye, FaEdit, FaTimes } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CommonButton from "./CommonButton";

function DataComponent() {
  const [dataResult, setDataResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw console.log("Network response was not ok");
        }
        const data = await response.json();
        // Add 'service' and 'user' Active ,Dropdown columns to the data
        const dataWithServiceAndUser = data.map((item) => ({
          Id: item.id,
          Body: item.body,
          Title: item.title,
          UserId: item.userId,
          Service: "",
          User: "",
          Active: false,
          Dropdown: null, // Initialize 'dropdown' with null
        }));
        setDataResult(dataWithServiceAndUser);
        setCount(dataWithServiceAndUser.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const populateTable = async (shouldAppendData) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      const newData = await response.json();
      // Add 'service' and 'user' columns to the new data
      const newDataWithServiceAndUser = newData.map((item) => ({
        Id: item.id,
        Body: item.body,
        Title: item.title,
        UserId: item.userId,
        Service: "",
        User: "",
        Active: false,
        Dropdown: null, // Initialize 'dropdown' with null
      }));
      if (shouldAppendData) {
        setDataResult((prevData) => [
          ...prevData,
          ...newDataWithServiceAndUser,
        ]);
      } else {
        setDataResult(newDataWithServiceAndUser);
      }
      setCount(newDataWithServiceAndUser.length);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const renderActions = (row, rowIndex) => {
    return (
      <div className="flex initial">
        <Tooltip title="View" arrow>
          <IconButton>
            <FaEye
              onClick={() => handleView(row)}
              style={{ cursor: "pointer" }}
              className="text-blue-500 hover:text-blue-600"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" arrow>
          <IconButton>
            <FaEdit
              onClick={() => handleEdit(row)}
              style={{ cursor: "pointer" }}
              className="text-green-500 hover:text-green-600"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel" arrow>
          <IconButton>
            <FaTimes
              onClick={() => handleCancel(row)}
              style={{ cursor: "pointer" }}
              className="text-red-500 hover:text-red-600"
            />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const handleView = (row) => {
    handleOpen();
    console.log("Viewed row:", row);
  };

  const editableColumns = ["Service", "User", "Active", "Dropdown"]; // Include the new columns in the editable columns list

  const renderInput = (row, rowIndex, column) => {
    if (column === "Active") {
      return (
        <input
          type="checkbox"
          className="text-center"
          checked={row.active}
          onChange={() => handleEditColumn(row, rowIndex, column, !row.active)}
        />
      );
    } else if (column === "Dropdown") {
      const options = [
        { value: "Service 1", label: " Water Service " },
        { value: "Service 2", label: "Gas Service " },
        { value: "Service 3", label: "Electric Service " },
        { value: "Service 3", label: "waste water Service " },
      ];

      return (
        <div className="my-1">
          <select
            className="px-3 my-1 py-1 placeholder-slate-300 bg-white rounded text-sm border border-slate-300 text-slate-600 outline-none focus:outline-none focus:ring"
            value={row.dropdown}
            onChange={(e) =>
              handleEditColumn(row, rowIndex, column, e.target.value)
            }
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <input
          className="px-3 my-1 py-1 placeholder-slate-300  bg-white rounded text-sm border border-slate-300 text-slate-600 outline-none focus:outline-none focus:ring"
          type="text"
          placeholder={column}
          onChange={(e) =>
            handleEditColumn(row, rowIndex, column, e.target.value)
          }
        />
      );
    }
  };

  const handleEditColumn = (row, rowIndex, column, value) => {
    const updatedData = [...dataResult];
    updatedData[rowIndex][column] = value;
    setDataResult(updatedData);
    console.log(updatedData);
  };

  const handleEdit = (row) => {
    handleOpen();
    console.log("Edited row:", row);
  };

  const handleCancel = (row) => {
    console.log("Cancelled row:", row);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center text-gray-400 font-semibold my-5">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <CommonDynamicTablePaginationNew
            dataResult={dataResult}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            count={count}
            renderActions={renderActions}
            populateTable={populateTable}
            removeHeaders={["UserId"]}
            highlightRow={false}
            editableColumns={editableColumns}
            renderInput={renderInput}
          />
        </>
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          className="border-lime-400 border"
          aria-describedby="modal-description"
        >
          <DialogTitle id="modal-title">Deactivate account</DialogTitle>
          <DialogContent>
            <p id="modal-description">
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="error">
              Deactivate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <CommonButton
        label="Click Me"
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700" // Pass Tailwind CSS classes directly
        disabled={false} 
      />
    </div>
  );
}

export default DataComponent;
