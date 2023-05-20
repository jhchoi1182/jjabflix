const BASE_URL = "https://api.themoviedb.org/3";
const API = process.env.REACT_APP_API;
const LANGUAGE = "ko";
const PAGE = "1";

type Params = {
  [key: string]: string | number | undefined;
};

const fetchData = async (url: string, params: Params) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => value && `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const response = await fetch(`${url}?${queryString}`);
  return response.json();
};

export const movieAPI = {
  nowPlaying: () => fetchData(`${BASE_URL}/movie/now_playing`, { api_key: API, language: LANGUAGE, page: PAGE }),
  popular: () => fetchData(`${BASE_URL}/movie/popular`, { api_key: API, language: LANGUAGE, page: PAGE }),
  top_rated: () => fetchData(`${BASE_URL}/movie/top_rated`, { api_key: API, language: LANGUAGE, page: PAGE }),
  upcoming: () => fetchData(`${BASE_URL}/movie/upcoming`, { api_key: API, language: LANGUAGE, page: PAGE }),
};

export const tvAPI = {
  airing_today: () => fetchData(`${BASE_URL}/tv/airing_today`, { api_key: API, language: LANGUAGE, page: PAGE }),
  on_the_air: () => fetchData(`${BASE_URL}/tv/on_the_air`, { api_key: API, language: LANGUAGE, page: PAGE }),
  popular: () => fetchData(`${BASE_URL}/tv/popular`, { api_key: API, language: LANGUAGE, page: PAGE }),
  top_rated: () => fetchData(`${BASE_URL}/tv/top_rated`, { api_key: API, language: LANGUAGE, page: PAGE }),
};

export const homeAPI = {
  trending: () => fetchData(`${BASE_URL}/trending/all/day`, { api_key: API, language: LANGUAGE }),
};

export const searchAPI = (keyword: string) => {
  return fetchData(`${BASE_URL}/search/multi`, {
    api_key: API,
    language: LANGUAGE,
    query: keyword,
    page: PAGE,
    include_adult: "true",
  });
};

export const posterAPI = (path?: string, size?: string) => {
  if (!path) {
    return "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  }
  return `https://image.tmdb.org/t/p/${size ?? "original"}/${path}`;
};

interface detailAPIParameter {
  id: number;
  media_type: "movie" | "tv";
}

export const detailAPI = ({ id, media_type }: detailAPIParameter) => {
  if (id === 0) return;
  if (media_type === "movie") {
    return fetchData(`${BASE_URL}/movie/${id}`, { api_key: API, language: LANGUAGE });
  }
  if (media_type === "tv") {
    return fetchData(`${BASE_URL}/tv/${id}`, { api_key: API, language: LANGUAGE });
  }
};
