import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Box, Modal, Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  NextButtonIcon,
  PreviousButtonIcon,
} from "../assets/commonassets/CommonAssets";
// Modal style
const style = {
  boxShadow: 10,
  overflowY: "scroll",
  bgcolor: "background.paper",
  borderRadius: 1,
  p: 0,
};
function ImageViewer({ images, onClose }) {
  console.log("Images Array : ", images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // call next Image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  // call Previous Image
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  //if click on escape from keyboard close image viewer
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <div
          className="fixed md:top-28 md:left-10 xl:top-24 xl:left-[169px] xl:w-[1000px] 2xl:w-[1100px]  bottom-0 lg:top-28 lg:left-52 lg:bottom-0 2xl:overflow-y-scroll 2xl:top-32 2xl:left-80 2xl:bottom-0 border border-gray-400 rounded p-2   flex w-[1100px] md:w-[750px] md:h-[500px] h-[500px] text-center justify-center   z-50 bg-white p-2"
          onKeyDown={handleKeyDown}
          tabIndex="0"
          id="carouselExampleCaptions"
          data-te-carousel-init
          data-te-ride="carousel"
        >
          <div class="relative w-full  overflow-y-scroll">
            <div className="relative  z-50 top-0  right-0 flex  justify-end  cursor-pointer text-customRed">
              <CancelPresentationIcon onClick={onClose} />
            </div>
            <div
              class="relative    w-full "
              data-te-carousel-active
              data-te-carousel-item
            >
              <img
                src={images[selectedImageIndex]}
                alt={`Image}`}
              // className="max-w-full h-full"
              />
            </div>
            <button
              class="rounded-full absolute bottom-6 right-10 z-[1] flex w-[6%]  border-1 border-white bg-none p-0 text-center text-red-500 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              onClick={handlePrevImage}
            >
              <Tooltip title="Previous">
                <span class="inline-block h-4 w-4">
                  <PreviousButtonIcon />
                </span>
              </Tooltip>
            </button>

            <button
              class="absolute bottom-6 right-4     z-[1] flex w-[5%]  border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline  hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              onClick={handleNextImage}
            >
              <Tooltip title="Next">
                <span class="inline-block h-4 w-4">
                  <NextButtonIcon />
                </span>
              </Tooltip>
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ImageViewer;
