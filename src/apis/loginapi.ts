import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const LoginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/accounts/signin/`, {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      if (result?.status === 400) {
        const errorMessage = result?.data?.non_field_errors?.[0];
        return errorMessage;
      } else {
        return result;
      }
    } else {
      return false;
    }
  }
};

//이 기능을 불러올 때 우리쪽에서 atom을 reset해주면 된다.
export const LogoutApi = async (token: string) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/accounts/signin/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const LoginmaintainApi = async (token: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/accounts/token/refresh/`, {
      refresh: token,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      if (result?.status === 400) {
        const errorMessage = result?.data?.non_field_errors?.[0];
        return errorMessage;
      } else {
        return result;
      }
    } else {
      return false;
    }
  }
};
