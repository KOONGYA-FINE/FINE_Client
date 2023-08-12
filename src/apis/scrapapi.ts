import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const postScrapMatchingApi = async (
  userid: number,
  postId: number,
  token: string
) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/posts/${postId}/${userid}/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response?.data?.detail;
      return result;
    }
  }
};

export const deleteScrapMatchingApi = async (
  userid: number,
  postId: number,
  token: string
) => {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/posts/${postId}/${userid}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response?.data?.detail;
      return result;
    }
  }
};
