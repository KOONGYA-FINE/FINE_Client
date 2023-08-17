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
      const result = error.response?.data?.detail;
      return result;
    }
  }
};

export const PostMatchingWritingApi = async (
  title: string,
  user_id: number,
  content: string,
  interest: string,
  language: string,
  token: string
) => {
  const result = `${title}\n${content}`;
  const apiKey: string = import.meta.env.VITE_OPENAI_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          language === "en"
            ? "You will be provided with a sentence in English, and your task is to translate it into Korean all of sentences."
            : "You will be provided with a sentence in Korean, and your task is to translate it into English all of sentences.",
      },
      { role: "user", content: result },
    ],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  axios
    .post(apiUrl, requestData, { headers })
    .then((response) => {
      const translatedContent = response.data.choices[0].message["content"];
      if (translatedContent !== "") {
        try {
          const response = axios.post(
            `${SERVER_URL}/posts/`,
            {
              title: title,
              user_id: user_id,
              content: content,
              interest: interest,
              language: language,
              translate: translatedContent,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return response;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const result = error.response;
            if (result?.status === 400 || result?.status === 401) {
              const errorMessage = error.response?.data?.detail;
              return errorMessage;
            } else {
              return false;
            }
          }
          return result;
        }
      }
    })
    .catch((error) => {
      console.error("Error while chatting:", error);
      return "Error while translating";
    });
};

export const editMatchingApi = async (
  postId: number,
  user_id: number,
  language: string,
  title: string,
  content: string,
  token: string
) => {
  const result = `${title}\n${content}`;
  const apiKey: string = import.meta.env.VITE_OPENAI_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          language === "en"
            ? "You will be provided with a sentence in English, and your task is to translate it into Korean all of sentences."
            : "You will be provided with a sentence in Korean, and your task is to translate it into English all of sentences.",
      },
      { role: "user", content: result },
    ],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  await axios
    .post(apiUrl, requestData, { headers })
    .then((response) => {
      const translatedContent = response.data.choices[0].message["content"];
      if (translatedContent !== "") {
        try {
          const response = axios.put(
            `${SERVER_URL}/posts/${postId}/`,
            {
              user_id: user_id,
              language: language,
              title: title,
              content: content,
              translate: translatedContent,
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
              const errorMessage = error.response?.data?.detail;
              return errorMessage;
            } else {
              return false;
            }
          }
          return result;
        }
      }
    })
    .catch((error) => {
      console.error("Error while chatting:", error);
      return "Error while translating";
    });
};

export const deleteMatchingApi = async (postId: number, token: string) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/posts/${postId}/`, {
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
