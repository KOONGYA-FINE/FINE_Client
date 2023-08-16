import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";
import { Params } from "react-router-dom";

export const GetProfileApi = async (token: string, username:string|undefined) => {
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

  export const EditProfileApi = async(username:string, token: string, newname:string, newsns: string, newimg:File|null) => {
    const data = new FormData();
    data.append('username', newname);
    data.append('sns', newsns);
    if (newimg !== null) {
      data.append('profile_image', newimg);
    }
    var keys = data.keys();
    console.log('key값');
    console.log(keys.next());
    console.log(keys.next());
    console.log(keys.next());
    var values = data.values();
    console.log('value값');
    console.log(values.next());
    console.log(values.next());
    console.log(values.next());

    try {
      const response = await axios.put(`${SERVER_URL}/profiles/${username}/`,
      data,
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
            } else if (error.status === 413){
              return error.status;
            } else {
              return result;
            }
          } else {
            return false;
          }
    }

  }