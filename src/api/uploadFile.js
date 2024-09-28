import { api } from "./axiosConfigs";

export const uploadFile = {
    upload: async function (token, file, cancel = false) {
        try {
          const formData = new FormData();
          formData.append('file', file); 
          const response = await api.request({
            url: `onboard/upload`,
            method: "POST",
            data: formData, 
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `${token}`
            }
          });
          return response.data; 
        } catch (error) {
          console.error("Error uploading file:", error);
          throw error;  
        }
      }
};
