import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const LoginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/accounts/signin/`, {
      email: email,
      passwrod: password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//이 기능을 불러올 때 우리쪽에서 atom을 reset해주면 된다.
export const LogoutApi = async () => {
  try {
    const response = await axios.delete(`${SERVER_URL}/accounts/signin/`);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};
