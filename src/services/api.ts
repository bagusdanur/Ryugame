import axios from "axios";

export const API_BASE_URL = "https://game.ryukomik.web.id";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

// Types
export interface GameCardItem {
  title: string;
  slug: string;
  thumbnail: string;
  image?: string;
  version?: string;
  rating?: number;
  engine?: string;
  tags?: string[];
  endpoint?: string;
  is_hot?: boolean;
}

export interface ApiListResponse {
  success: boolean;
  page?: number;
  totalPages?: number;
  total: number;
  data: GameCardItem[];
}
