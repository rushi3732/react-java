import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import CancelPresentationIconButton from "../Buttons/CancelPresentationIconButton";
// import useGeneratePdf from "./GeneratePdfHook";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  minHeight: "65%",
  maxHeight: "80%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 20,
};

export default function CommonPrintModal(props) {
  const { open, setOpen, handleOpen, handleClose, renderPrint } = props;

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle} className="">
          {/* <CancelPresentationIconButton
            onClick={() => {
              props.setOpen(false);
              handleClose();
            }}
          /> */}
          {renderPrint && renderPrint()}
        </Box>
      </Modal>
    </div>
  );
}
