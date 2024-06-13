import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDynamicTablePaginationNew from "./common/CommonDynamicTablePagination";
import { FaEye, FaEdit, FaTimes } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LoadingSpinner from "./common/loading/LoadingSpinner";
import { errorAlert } from "../Common Components/Toasts/CustomToasts";

const validationSchema = Yup.object().shape({
  accountId: Yup.object().optional(),
  accountType: Yup.string().required("Account Type is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[\d-]+$/, "Phone number must only contain numbers and dashes")
    .test(
      "is-ten-digits",
      "Phone number must be exactly 10 digits",
      (value) => {
        const digitsOnly = value ? value.replace(/-/g, "") : "";
        return digitsOnly.length === 10;
      }
    ),
});

const AccountList = () => {
  const [dataResult, setDataResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [actionTitle, setActionTitle] = useState("Create");
  const [showModal, setShowModal] = useState(false);

  const defaultValue = {
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValue,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAction = (row) => {
    deleteAccount(row.Id);
    // Handle your confirm action here
    handleCloseModal();
  };

  const fetchAccounts = () => {
    api
      .get("/accounts")
      .then((response) => {
        const accountsAll = response.data.data.map((item) => ({
          Id: item._id,
          AccountNumber: item.accountNumber,
          FirstName: item.firstName,
          LastName: item.lastName,
          Email: item.email,
          Phone: item.phone,
          AccountType: item.accountType,
          CreatedAt: item.createdAt,
          UpdatedAt: item.updatedAt,
        }));

        setDataResult(accountsAll);
        setCount(accountsAll.length);
        setIsLoading(false);
      })
      .catch((error) => {
        errorAlert(error.message);
      });
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
        <Tooltip title="Delete" arrow>
          <IconButton>
            <FaTimes
              onClick={() => handleConfirmAction(row)}
              style={{ cursor: "pointer" }}
              className="text-red-500 hover:text-red-600"
            />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const handleEdit = async (account) => {
    try {
      console.log(account);
      setId(account.Id);
      setActionTitle("Update");
      const response = await api.get(`/account/${account.Id}`);
      const updatedFormData = response.data.data;
      console.log(updatedFormData);
      reset(updatedFormData);
      handleOpen();
    } catch (error) {
      console.error("Error fetching account by ID:", error);
    }
  };

  const handleView = (row) => {
    handleOpen();
    console.log("Viewed row:", row);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setOpen(true);
    setActionTitle("Create");
    reset(defaultValue);
  };

  const handleClose = () => {
    setId(0);
    setOpen(false);
    reset();
  };

  const deleteAccount = async (accountId) => {
    try {
      await api.delete(`/accountdeleteById/${accountId}`);
      toast.warn("Account Delete successfully ");
      fetchAccounts();
    } catch (error) {
      toast.error(" Error deleting account  ");
      console.error("Error deleting account:", error);
    }
  };

  const populateTable = async (shouldAppendData) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await api.get("/accounts");

      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      const accountsAll = response.data.data.map((item) => ({
        Id: item._id,
        AccountNumber: item.accountNumber,
        FirstName: item.firstName,
        LastName: item.lastName,
        Email: item.email,
        Phone: item.phone,
        AccountType: item.accountType,
        CreatedAt: item.createdAt,
        UpdatedAt: item.updatedAt,
      }));
      if (shouldAppendData) {
        setDataResult((prevData) => [...prevData, ...accountsAll]);
      } else {
        setDataResult(accountsAll);
      }
      setCount(accountsAll.length);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdateAccount = async (data) => {
    const accountData = {
      accountId: id,
      accountType: data.accountType,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    try {
      if (id) {
        await api.put(`/accountupdate/${accountData.accountId}`, accountData);
        setId(0);
        toast.success(`Account Updated successfully`);
      } else {
        await api.post("/saveaccounts", accountData);
        fetchAccounts();
        toast.success(`Account Created successfully`);
      }
      handleClose();
      fetchAccounts();
    } catch (error) {
      toast.error(`Error{actionTitle} Account`);
      console.error("Error creating/updating account:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleCreateOpen}
      >
        Create Account
      </button>
      <div>
        {isLoading ? (
          <div className="flex justify-center text-gray-400 font-semibold my-5">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {dataResult.length > 0 ? (
              <CommonDynamicTablePaginationNew
                dataResult={dataResult}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                count={count}
                renderActions={renderActions}
                populateTable={populateTable}
                removeHeaders={["Id"]}
                highlightRow={false}
                // editableColumns={editableColumns}
                // renderInput={renderInput}
              />
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-black text-white py-3">
          {actionTitle} Account
        </DialogTitle>
        <DialogContent>
          <form className="pt-3">
            <div className="mb-4 mt-2">
              <Controller
                name="accountType"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Account Type"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="First Name"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Last Name"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Email"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Phone"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className="justify-center pr-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            {actionTitle === "Create" ? "Cancel" : "Discard"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit(handleCreateOrUpdateAccount)}
          >
            {actionTitle === "Create" ? "Create" : "Update"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountList;
