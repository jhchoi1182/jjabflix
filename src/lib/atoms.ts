import { atom, selector } from "recoil";
import { bookmarkedLocalStorage, detailLocalStorage, saveDetailDataToLocalStorage } from "../utils/Local";
import { IContent } from "../interface/Interface";

/** 각 아이템의 상세 정보 */
const detailAtom = atom<IContent>({
  key: "detail",
  default: detailLocalStorage,
});

/** 새로고침 시에도 상세 정보 모달이 유지될 수 있다록 로컬 스토리지에 저장 */
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
  key: "category",
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

/** 뷰 포트 너비에 따른 슬라이드 아이템 수 */
export const slideItemCountAtom = atom({
  key: "slideItem",
  default: {
    totalSlideItemNum: 8,
    bothSideExceptSlideItemNum: 6,
  },
});
