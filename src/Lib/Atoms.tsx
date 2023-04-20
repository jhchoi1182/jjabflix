import { atom, selector } from "recoil";

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

/** 슬라이더 버튼, 페이지 표시의 opacity 설정하기 위한 atom */

type SliderRef = {
  sliderArrowRef?: HTMLElement | null;
  sliderIndicatorRef?: HTMLElement | null;
};

const sliderRefAtom = atom<SliderRef>({
  key: "sliderRefAtom",
  default: {
    sliderArrowRef: null,
    sliderIndicatorRef: null,
  },
});

export const sliderRefSelector = selector<SliderRef>({
  key: "sliderRefSelector",
  get: ({ get }) => {
    const { sliderArrowRef, sliderIndicatorRef } = get(sliderRefAtom);
    return { sliderArrowRef, sliderIndicatorRef };
  },
  set: ({ set, get }, data) => {
    set(sliderRefAtom, { ...get(sliderRefAtom), ...data });
  },
});
