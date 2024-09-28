import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenAPI } from '../api/getToken'; 
import { useDispatch } from 'react-redux';
import { setCustomerID } from '../store/reducer';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AcrediaPage = () => {
  const query = useQuery();
  const customerID = query.get("customer_id");
  const dispatch = useDispatch();
  dispatch(setCustomerID(customerID))
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleNavigation = async () => {
    try {
      const data = await tokenAPI.get(customerID, false);
      if (data.status === 200) {
        const token = data.data.token;
        if (data.data.submission_status === true) {
          navigate(`/fb/home?token=${token}`);
        } else {
          navigate(`/fb?token=${token}`);
        }
      } else {
        console.error("Failed to fetch token, status code:", data.status);
        setError("Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      setError("Error fetching token");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center bg-white p-10 shadow-xl rounded-lg max-w-lg">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to Acredia
        </h1>
        <p className="text-gray-600 text-2xl mb-2">
          {customerID
            ? `Hello, Customer ${customerID}!`
            : 'Hello, valued customer!'}
        </p>
        <p className="text-gray-500 text-lg mb-6">
          Click the button below to manage your funding on the FicusBridge platform.
        </p>
        <button
          onClick={handleNavigation}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Funding Manager
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AcrediaPage;
