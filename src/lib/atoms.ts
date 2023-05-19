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

/** 즐겨찾기 상태관리 */

export const FavoriteAtom = atom<IContent[]>({
  key: "favoriteContents",
  default: bookmarkedLocalStorage,
});

/** 레이아웃id */

export const categoryAtom = atom({
  key: "layoutId",
  default: "",
});

/** 툴팁 상태관리 */

interface ItooltipAtom {
  isHovered: boolean;
  text: string;
  top: number;
  x: number;
  size: "slideTooltip" | "detailTooltip";
}

export const tooltipAtom = atom<ItooltipAtom>({
  key: "isHovered",
  default: {
    isHovered: false,
    text: "",
    top: 0,
    x: 0,
    size: "slideTooltip",
  },
});
