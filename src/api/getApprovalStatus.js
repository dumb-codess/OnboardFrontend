import { api } from "./axiosConfigs";

export const getAporovalStatus = {
  get: async function (token, cancel = false) {
    try {
      const response = await api.request({
        url: `interaction/check-approval-status`,
        method: "GET",
        headers: {
          'Authorization': `${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;  
    }
  }
};
