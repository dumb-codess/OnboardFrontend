import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFile } from "../api/uploadFile";
import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from 'react-redux';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DownloadUploadPage = () => {
  const query = useQuery();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isReSend, setIsReSend] = useState(false); 
  const tokenFromParam = query.get("token");
  const customerID = useSelector((state) => state.customerID.value); 
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      setFile(null);
      setFileName("");
    } else {
      setError(null);
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a valid PDF file");
      return;
    }

    try {
      const data = await uploadFile.upload(tokenFromParam, file);
      setSuccessMessage("Your application has been sent for review.");
      setError(null);
      setOpen(true);
      setIsReSend(true);
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleGoBackToAcredia = () => {
      navigate(`/acredia?customer_id=${customerID}`);
  };
  const handleReSend = async () => {
    setSuccessMessage(null);
    setOpen(false);
    setIsReSend(false);
    await handleSubmit();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf";
    link.download = "dummy.pdf";
    link.click();
  };

  return (
    <div className="flex items-center justify-center p-12 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="mx-auto w-full max-w-[700px] bg-white shadow-2xl rounded-lg">
        <form className="py-6 px-8" onSubmit={handleSubmit}>
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-2xl font-semibold text-blue-700 text-center">
              Upload PDF File
            </label>
            <div className="mb-8">
              <input
                type="file"
                name="file"
                id="file"
                accept="application/pdf"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-gray-400 p-12 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-blue-700">
                    Drop PDF files here
                  </span>
                  <span className="mb-2 block text-base font-medium text-gray-500">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-gray-400 py-2 px-8 text-base font-medium text-blue-700">
                    Browse
                  </span>
                </div>
              </label>
              {fileName && (
                <p className="mt-4 text-sm font-medium text-gray-700">
                  Selected file: {fileName}
                </p>
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          <div>
            <button
              className={`w-full rounded-md ${
                isReSend
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-blue-600 hover:bg-blue-500"
              } py-4 text-center text-base font-semibold text-white outline-none transition-all duration-200`}
              type="submit"
            >
              {isReSend ? "Re-send File" : "Send File"}
            </button>
          </div>
        </form>

        <div className="flex justify-center my-8 flex-col px-8">
          <label className="mb-5 block text-xl font-semibold text-blue-700 text-center">
            Download Form
          </label>
          <button
            className="download-button w-full transform active:scale-95 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg font-bold tracking-widest transition-all duration-200"
            onClick={handleDownload}
          >
            <div className="flex justify-center items-center relative">
              <div className="svg-container">
                <svg
                  className="download-icon"
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="download-arrow"
                    d="M13 9L9 13M9 13L5 9M9 13V1"
                    stroke="#F2F2F2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                    stroke="#F2F2F2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="download-loader text-white hidden"></div>
                <svg
                  className="check-svg hidden"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="button-copy pl-2 leading-none uppercase">
                DOWNLOAD
              </div>
            </div>
          </button>
          <div className="flex w-full justify-center py-3 mt-7">
            <button
              className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={handleGoBackToAcredia}
            >
              Back to Acredia
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={handleCloseModal} className="relative z-20">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
          <Dialog.Panel className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex-col items-center justify-center">
              <div className="flex justify-center pb-3">
                <CheckCircleIcon
                  className="w-12 h-12 text-green-600 mr-4"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Successfully Uploaded!
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Your file has been successfully uploaded and is now under
                  review.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-20">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors duration-300"
              >
                OK
              </button>
              <button
                type="button"
                onClick={handleGoBackToAcredia}
                className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300"
              >
                Go Back to Acredia
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DownloadUploadPage;
