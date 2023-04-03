const BASE_URL = "https://api.themoviedb.org/3";
const API = process.env.REACT_APP_API;

export interface IResult {
  backdrop_path: string;
  id: number;
  title: string;
  name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
}

export interface IGetData {
  dates?: {
    maximuum: string;
    minimuum: string;
  };
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}


export const homeAPI = () => {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${API}`).then((response) => response.json());
};

export const posterAPI = (id: string, size?: string) => {
  return `https://image.tmdb.org/t/p/${size ?? "original"}/${id}`;
};
