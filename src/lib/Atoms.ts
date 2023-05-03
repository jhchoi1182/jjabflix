import { atom } from "recoil";
import { getFavoriteLocal } from "../utils/Local";
import { IContent } from "../interface/Interface";

export const detailAtom = atom<IContent>({
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
    seasons: [],
    runtime: 0,
    tagline: "",
    title: "",
    vote_average: 0,
    category: "",
    media_type: "movie",
  },
});

/** 즐겨찾기 */

export const FavoriteAtom = atom({
  key: "favoriteContents",
  default: getFavoriteLocal,
});

/** 레이아웃id */

export const categoryAtom = atom({
  key: "layoutId",
  default: "",
});
