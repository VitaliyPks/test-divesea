import axios from "axios";
import { API_CONFIG } from "../utils/constants";

interface APIResponse {
  id: string;
  name: string;
}

export const fetchNFTsFromAPI = async (): Promise<APIResponse[]> => {
  try {
    const response = await axios.get<APIResponse[]>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NFT_LIST}`,
      {
        timeout: API_CONFIG.TIMEOUT,
      },
    );

    return response.data.splice(0, 10);
  } catch (error) {
    console.error("API Error:", error);
    // throw error;
  }
};
