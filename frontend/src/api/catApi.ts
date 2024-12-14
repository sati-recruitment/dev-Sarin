import axios from "axios";

const apiKey = import.meta.env.VITE_CAT_API_KEY;
const apiUrl = import.meta.env.VITE_CAT_API_URL;

export const fetchCats = async (imagesNumber: number) => {
  const response = await axios.get(apiUrl, {
    params: {
      limit: imagesNumber,
      api_key: apiKey,
    },
  });
  return response.data;
};
