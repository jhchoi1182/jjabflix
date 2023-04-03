const BASE_URL = "https://api.themoviedb.org/3";
const API = process.env.REACT_APP_API;

export const homeAPI = () => {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${API}&language=ko`).then((response) => response.json());
};

export const posterAPI = (path: string, size?: string) => {
  return `https://image.tmdb.org/t/p/${size ?? "original"}/${path}`;
};
