import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCustomerID } from "../store/reducer"; 

function HomePage() {
  const customerID = useSelector((state) => state.customerID.value); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerID) {
      navigate(`/acredia?customer_id=${customerID}`);
    } else {
      alert("Please enter a valid Customer ID");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-2 w-96"
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Acredia</h1>
        <p className="pb-4 text-gray-500">Enter the Customer ID to login to Acredia</p>
        <div>
          <label> CustomerID </label>
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerID}
            onChange={(e) => dispatch(setCustomerID(e.target.value))}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Get Started
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
