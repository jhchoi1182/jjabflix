import { atom } from "recoil";

interface Genre {
  id: number;
  name: string;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  seasons?: [];
  runtime?: number;
  tagline: string;
  title: string;
  vote_average: number;
}

export const detailAtom = atom<IDetail>({
  key: "content",
  default: {
    adult: false,
    backdrop_path: "",
    genres: [],
    id: 0,
    original_title: "",
    overview: "",
    poster_path: "",
    release_date: new Date(),
    runtime: 0,
    tagline: "",
    title: "",
    vote_average: 0,
  },
});
