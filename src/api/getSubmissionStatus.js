import { api } from "./axiosConfigs";

export const getSubmissionStatus = {
  get: async function (token, cancel = false) {
    try {
      console.log("calling....")
      const response = await api.request({
        url: `onboard/check-submission`,
        method: "GET",
        headers: {
          'Authorization': `${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching submission status:", error);
      throw error;  
    }
  }
};