import { MainBannerProps } from "../components/organisms/MainBanner/MainBanner";

const BASE_URL = "https://api.themoviedb.org/3";
const API = process.env.REACT_APP_API;

export const homeAPI = () => {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${API}&language=ko`).then((response) => response.json());
};

export const searchAPI = (keyword: string) => {
  return fetch(`${BASE_URL}/search/multi?api_key=${API}&language=ko&query=${keyword}&page=1&include_adult=true`).then(
    (response) => response.json()
  );
};

export const posterAPI = (path?: string, size?: string) => {
  if (!path) return `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930`;
  return `https://image.tmdb.org/t/p/${size ?? "original"}/${path}`;
};

export const detailAPI = ({ id, media_type }: MainBannerProps) => {
  if (id === 0) return;
  if (media_type === "movie")
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API}&language=ko`).then((response) => response.json());
  if (media_type === "tv")
    return fetch(`${BASE_URL}/tv/${id}?api_key=${API}&language=ko`).then((response) => response.json());
  else return;
};
