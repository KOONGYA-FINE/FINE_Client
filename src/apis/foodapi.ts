import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const FoodRegisterApi = async (
  token: string,
  name: string,
  score: number,
  address: string,
  latitude: number,
  longitude: number,
  tag: string,
  content: string,
  image?: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("score", score.toString());
  formData.append("address", address);
  formData.append("latitude", latitude.toString());
  formData.append("longitude", longitude.toString());
  formData.append("tag", tag);
  formData.append("content", content);
  {
    image === undefined
      ? formData.append("image", "")
      : formData.append("image", image);
  }
  try {
    const response = await axios.post(`${SERVER_URL}/places/`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      if (result?.status === 401) {
        const errorMessage = result?.data?.detail;
        return errorMessage;
      } else {
        return result;
      }
    } else {
      return false;
    }
  }
};

export const getFoodInfoApi = async (placeId: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/places/${placeId}/`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response?.data?.detail;
      return result;
    }
  }
};

export const deleteFoodRegisterApi = async (placeId: number, token: string) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/places/${placeId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response?.data?.detail;
      return result;
    }
  }
};

export const putFoodRegisterApi = async (
  placeId: number,
  token: string,
  score: number,
  tag: string,
  content: string,
  image?: File
) => {
  try {
    const response = await axios.put(
      `${SERVER_URL}/places/${placeId}/`,
      {
        score: score,
        tag: tag,
        content: content,
        image: image,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      if (result?.status === 401 || result?.status === 404) {
        const errorMessage = result?.data?.detail;
        return errorMessage;
      } else {
        return result;
      }
    } else {
      return false;
    }
  }
};

export const getAllPlacesApi = async(page:number, tag:string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/places/?page=${page}${tag}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      console.log(result?.status);
      console.log(result?.data.accept);
      return result;
    } else {
      return false;
    }
  }
}