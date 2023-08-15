import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const GetProfileApi = async (token: string, username:string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/profiles/${username}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result = error.response;
            if (result?.status === 401) {
              const errorMessage = result?.data?.detail;
              return errorMessage;
            } else if (result?.status === 404){
                const errorMessage = result?.data?.message;
                return errorMessage;
            } else {
              return result;
            }
          } else {
            return false;
          }
    }
  };

  export const EditProfileApi = async(username:string, token: string, json:any) => {
    try {
      const response = await axios.put(`${SERVER_URL}/profiles/${username}/`,
      json,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const result = error.response;
            if (result?.status === 401 || result?.status === 403 || result?.status === 404) {
              const errorMessage = result?.data?.detail;
              return errorMessage;
            } else if (result?.status === 400) {
              console.log(result?.data);
              const errorMessage = result?.data;
              return errorMessage;
            } else {
              return result;
            }
          } else {
            return false;
          }
    }

  }