import { IDetail } from "../lib/Atoms";

export const getFavoriteLocal: IDetail[] = JSON.parse(localStorage.getItem("favorite") ?? "[]");

export const setFavoriteLocal = (data: IDetail[]) => {
  return localStorage.setItem("favorite", JSON.stringify(data));
};
