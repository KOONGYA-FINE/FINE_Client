import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const getPostMatchingApi = async (postId: number, token: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/posts/${postId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    }
  }
};
