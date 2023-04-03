import { atom } from "recoil";
import { IResult } from "../Interface/ApiInterface";

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
