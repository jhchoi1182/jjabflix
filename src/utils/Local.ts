import { IContent } from "../interface/Interface";

/** 로컬스토리지를 활용한 즐겨찾기 기능 구현 */

export const bookmarkedLocalStorage: IContent[] = JSON.parse(localStorage.getItem("favorite") ?? "[]");

export const saveBookmarkDataToLocalStorage = (data: IContent[]) => {
  return localStorage.setItem("favorite", JSON.stringify(data));
};
