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
        console.log(error)
        return false;
        // if (axios.isAxiosError(error)) {
        //     const result = error.response;
        //     console.log(result?.status);
        //     console.log(result?.data.accept);
        //     return result?.status;
        //   } else {
        //     return false;
        //   }
    }
  };