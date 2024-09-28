import { api } from "./axiosConfigs";

export const tokenAPI = {
  get: async function (id, cancel = false) {
    try {
      const response = await api.request({
        url: `auth?customer_id=${id}`,
        method: "POST",
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;  
    }
  }
};
