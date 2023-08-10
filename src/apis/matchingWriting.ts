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
            ? "You will be provided with a sentence in English, and your task is to translate it into Korean."
            : "You will be provided with a sentence in Korean, and your task is to translate it into English.",
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
            const result = error.response?.data?.detail;
            return result;
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error while chatting:", error);
      return "Error while translating";
    });
};
