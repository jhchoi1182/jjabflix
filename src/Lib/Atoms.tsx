import { atom } from "recoil";

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
  page?: number;
  results: IResult[];
  total_pages?: number;
  total_results?: number;
  category: string;
}

export const detailAtom = atom<IResult>({
  key: "content",
  default: {
    backdrop_path: "",
    id: 0,
    title: "",
    name: "",
    original_title: "",
    overview: "",
    poster_path: "",
    media_type: "",
  },
});