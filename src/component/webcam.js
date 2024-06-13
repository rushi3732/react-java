import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api/api";

function WebCam() {
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [isScreenRecorded, setIsScreenRecorded] = useState(false);
  const [screenBlobUrl, setScreenBlobUrl] = useState("");
  const [isCameraRecording, setIsCameraRecording] = useState(false);
  const [isCameraRecorded, setIsCameraRecorded] = useState(false);
  const [cameraBlobUrl, setCameraBlobUrl] = useState("");

  const screenStreamRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const screenMediaRecorderRef = useRef(null);
  const cameraMediaRecorderRef = useRef(null);

  useEffect(() => {
    if (isScreenRecording) {
      startScreenRecording();
    }
  }, [isScreenRecording]);

  useEffect(() => {
    if (isCameraRecording) {
      startCameraRecording();
    }
  }, [isCameraRecording]);
  const startScreenRecording = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((videoStream) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((audioStream) => {
            const mediaStream = new MediaStream();

            // Add video track to the combined stream
            videoStream.getTracks().forEach((track) => {
              mediaStream.addTrack(track);
            });

            // Add audio track to the combined stream
            audioStream.getTracks().forEach((track) => {
              mediaStream.addTrack(track);
            });

            screenStreamRef.current = mediaStream;

            screenMediaRecorderRef.current = new MediaRecorder(mediaStream);

            screenMediaRecorderRef.current.ondataavailable = (event) => {
              if (event.data.size > 0) {
                const blob = new Blob([event.data], { type: "video/webm" });
                setScreenBlobUrl(URL.createObjectURL(blob));
              }
            };

            screenMediaRecorderRef.current.start();
            setIsScreenRecorded(false);
            setScreenBlobUrl("");
            toast.info("Screen recording started with audio.");
          })
          .catch((error) => {
            setIsScreenRecording(false);
          });
      })
      .catch((error) => {
        setIsScreenRecording(false);
      });
  };

  const stopScreenRecording = () => {
    if (screenStreamRef.current) {
      screenMediaRecorderRef.current.stop();
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsScreenRecording(false);
      setIsScreenRecorded(true);
      toast.info("Screen recording stopped.");
    }
  };

  const startCameraRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        cameraStreamRef.current = stream;
        cameraMediaRecorderRef.current = new MediaRecorder(stream);

        cameraMediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const blob = new Blob([event.data], { type: "video/webm" });
            setCameraBlobUrl(URL.createObjectURL(blob));
          }
        };

        cameraMediaRecorderRef.current.start();
        setIsCameraRecorded(false);
        setCameraBlobUrl("");
        toast.info("Camera recording started.");
      })
      .catch((error) => {
        setIsCameraRecording(false);
      });
  };

  const stopCameraRecording = () => {
    if (cameraStreamRef.current) {
      cameraMediaRecorderRef.current.stop();
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsCameraRecording(false);
      setIsCameraRecorded(true);
      toast.info("Camera recording stopped.");
    }
  };

  const handleUpload = async (blobUrl, endpoint) => {
    if (blobUrl) {
      const formData = new FormData();
      formData.append("video", new Blob([blobUrl]));

      try {
        await api.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Video uploaded successfully.");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error("Error uploading video. Please try again.");
        } else {
          toast.error("An error occurred while uploading the video.");
        }
      }
    } else {
      toast.warn("No recorded video to upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full max-w-screen-lg">
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <h1 className="text-2xl text-blue-600 not-sr-only">
              Screen Recording
            </h1>
            <div className="flex items-center">
              <div className="flex-1">
                {isScreenRecording ? (
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 focus:not-sr-only"
                    onClick={stopScreenRecording}
                  >
                    Stop Screen Recording
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-full hover:bg-blue-600 focus:not-sr-only"
                    onClick={() => setIsScreenRecording(true)}
                  >
                    Start Screen Recording
                  </button>
                )}
              </div>
            </div>
          </div>
          {isScreenRecorded && (
            <div className="mt-6">
              <h1 className="text-2xl text-blue-600 not-sr-only">
                Recorded Screen
              </h1>
              <video
                className="w-full border-2 border-lime-500"
                src={screenBlobUrl}
                controls
                autoPlay
              />
            </div>
          )}
          {isScreenRecorded && (
            <button
              className="bg-red-500 mt-2 text-white py-1 px-2 rounded-full hover:bg-red-600 focus:not-sr-only"
              onClick={() => handleUpload(screenBlobUrl, "/webcam")}
            >
              Upload Screen Video
            </button>
          )}
        </div>

        <div className="w-1/2 p-4">
          <div className="mb-4">
            <h1 className="text-2xl text-blue-600 not-sr-only">
              Camera Recording
            </h1>
            <div className="flex items-center">
              <div className="flex-1">
                {isCameraRecording ? (
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-full hover-bg-red-600 focus:not-sr-only"
                    onClick={stopCameraRecording}
                  >
                    Stop Camera Recording
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-full hover:bg-blue-600 focus:not-sr-only"
                    onClick={() => setIsCameraRecording(true)}
                  >
                    Start Camera Recording
                  </button>
                )}
              </div>
            </div>
          </div>
          {isCameraRecorded && (
            <div className="mt-6">
              <h1 className="text-2xl text-blue-600 not-sr-only">
                Recorded Camera
              </h1>
              <video
                className="w-full border-2 border-lime-500"
                src={cameraBlobUrl}
                controls
                autoPlay
              />
            </div>
          )}
          {isCameraRecorded && (
            <button
              className="bg-red-500 mt-2 text-white py-1 px-2 rounded-full hover-bg-red-600 focus:not-sr-only"
              onClick={() => handleUpload(cameraBlobUrl, "/webcam")}
            >
              Upload Camera Video
            </button>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ top: "80px", right: "20px" }}
      />
    </div>
  );
}

export default WebCam;
