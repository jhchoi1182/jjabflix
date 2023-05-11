import { atom, selector } from "recoil";
import { bookmarkedLocalStorage, detailLocalStorage, saveDetailDataToLocalStorage } from "../utils/Local";
import { IContent } from "../interface/Interface";

/** 상세 정보 */

const detailAtom = atom<IContent>({
  key: "detail",
  default: detailLocalStorage,
});

export const detailSelector = selector({
  key: "detailSelector",
  get: ({ get }) => {
    return get(detailAtom);
  },
  set: ({ set }, content) => {
    saveDetailDataToLocalStorage(content);
    set(detailAtom, content);
  },
});

/** 즐겨찾기 */

export const FavoriteAtom = atom<IContent[]>({
  key: "favoriteContents",
  default: bookmarkedLocalStorage,
});

/** 레이아웃id */

export const categoryAtom = atom({
  key: "layoutId",
  default: "",
});
