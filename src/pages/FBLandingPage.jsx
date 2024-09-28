import React, { useEffect, useState } from "react";
import { getAporovalStatus } from "../api/getApprovalStatus";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FBLandingPage = () => {
  const query = useQuery();
  const customerID = useSelector((state) => state.customerID.value); 
  const tokenFromParam = query.get("token");
  const [open, setOpen] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      try {
        const data = await getAporovalStatus.get(tokenFromParam);
        setApprovalStatus(data.data.form_status);
        if (data.data.form_status === "PENDING" || data.data.form_status === "DISCARDED") {
          setOpen(true);
        }
      } catch (error) {
        console.error("Error fetching approval status:", error);
      }
    };

    fetchApprovalStatus();
  }, [tokenFromParam]);

  const handleClose = () => {
    navigate(`/acredia?customer_id=${customerID}`);
  };

  const handleReSubmit = () => {
    navigate(`/fb?token=${tokenFromParam}`);
  };

  if (approvalStatus === null) {
    return (
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div>
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  We are under maintenance...
                </h1>
                <p className="my-2 text-gray-800">
                  Sorry about that! Please visit our homepage to get where you need to go.
                </p>
                <button
                  className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                  onClick={handleClose}
                >
                  Take me to Acredia!
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="Maintenance" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Error" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      {/* Apply blur effect to the background when modal is open */}
      {open && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-50 backdrop-blur-md z-10" />
      )}

      {/* Modal */}
      <Dialog open={open} onClose={() => {}} className="relative z-20">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {approvalStatus === "PENDING"
                        ? "Your application is under review."
                        : "Your application is Discarded."}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {approvalStatus === "PENDING"
                          ? "Your application is currently being reviewed. Please wait for further updates."
                          : "Unfortunately, your application has been discarded. Please resubmit if necessary."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleReSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Re-Submit Form
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Go Back
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Conditional rendering of the landing page */}
      {!open && (
        <div className="text-center p-6 max-w-xl mx-auto z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to FicusBridge!
          </h1>
          <p className="text-white text-2xl mb-2">
            {customerID
              ? `Hello, Customer ${customerID}!`
              : "Hello, valued customer!"}
          </p>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8">
            Optimizing funding for aged care providers, making operations
            efficient, and improving your workflows.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 py-3 px-8 rounded-full font-semibold shadow-lg">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-300 py-3 px-8 rounded-full font-semibold">
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FBLandingPage;
