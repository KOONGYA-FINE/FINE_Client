import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const SignupAccountApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/accounts/signup/`, {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const EmailCheckApi = async(email:string) => {
    try{
        const response = await axios.get(`${SERVER_URL}/accounts/email/${email}`)
        console.log(response?.status);
        return response;
    } catch(error) {
      if (axios.isAxiosError(error)) {
        const result = error.response;
        console.log(result?.status);
        console.log(result?.data.accept);
        return result?.status;
      } else {
        return false;
      }
    }
}

export const SendingVerifyApi = async(email:string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/accounts/email-verify/`, {
      email: email,
    });
    console.log(response?.data.message)
    return response.data.message;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const VerifyCheckApi = async(code:number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/accounts/email-verify/`, {params : {code: code,}});
    console.log(response?.data.message)
    return response.data.message;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const SignUpUserInfoApi = async (
    username: string,
    nation: number,
    birth: string,
    school: string,
    gender: string,
    token: string) => {
    try {
      const response = await axios.put(`${SERVER_URL}/accounts/userInfo/`, {
        username: username,
        nation: nation,
        birth: birth,
        school: school,
        gender: gender,
      }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };