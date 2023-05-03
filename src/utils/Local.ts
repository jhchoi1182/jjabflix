import { IContent } from "../interface/Interface";

export const getFavoriteLocal: IContent[] = JSON.parse(localStorage.getItem("favorite") ?? "[]");

export const setFavoriteLocal = (data: IContent[]) => {
  return localStorage.setItem("favorite", JSON.stringify(data));
};
