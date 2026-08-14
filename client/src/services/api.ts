import axios from "axios";
import type {
  ApiResponse,
  Destination,
  Place,
} from "../../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDestinations = async () => {
  const response = await api.get<ApiResponse<Destination[]>>(
    "/destinations"
  );

  return response.data.data;
};

export const getDestination = async (name: string) => {
  const response = await api.get<ApiResponse<Destination>>(
    `/destinations/${encodeURIComponent(name)}`
  );

  return response.data.data;
};

export const getDestinationPlaces = async (name: string) => {
  const response = await api.get<ApiResponse<Place[]>>(
    `/destinations/${encodeURIComponent(name)}/places`
  );

  return response.data.data;
};

export const getDestinationInterests = async (
  destination: string
) => {
  const response = await api.get<ApiResponse<string[]>>(
    `/discover/interests/${encodeURIComponent(destination)}`
  );

  return response.data.data;
};

export const getDestinationsByInterest = async (
  interest: string
) => {
  const response = await api.get<ApiResponse<Destination[]>>(
    `/discover/destinations`,
    {
      params: {
        interest,
      },
    }
  );

  return response.data.data;
};

export default api;