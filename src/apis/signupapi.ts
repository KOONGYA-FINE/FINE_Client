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
        const response = await axios.get(`${SERVER_URL}/accounts/email/:${email}`)
        return response;
    } catch(error) {
        console.log(error)
        return false
    }
}

export const SignUpUserInfoApi = async (
    username: string,
    nation: number,
    birth: string,
    school: string,
    gender: string) => {
    try {
      const response = await axios.post(`${SERVER_URL}/accounts/signup/`, {
        username: username,
        nation: nation,
        birth: birth,
        school: school,
        gender: gender
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };