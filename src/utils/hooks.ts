import { useRecoilState } from "recoil";
import { FavoriteAtom } from "../lib/Atoms";
import { setFavoriteLocal } from "./Local";
import { IContent } from "../interface/Interface";

export const useButtonOpacity = () => {
  let opacitySetTimeout: ReturnType<typeof setTimeout>;

  const setButtonOpacity = (opacity: number) => {
    document.documentElement.style.setProperty("--opacity", `${opacity}`);
  };

  const setButtonOpacityAfterDelay = (opacity: number) => {
    opacitySetTimeout = setTimeout(() => {
      setButtonOpacity(opacity);
    }, 500);
  };

  const setButtonOpacityAfterDelayInvalidation = () => {
    clearTimeout(opacitySetTimeout);
  };

  return { setButtonOpacity, setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation };
};


/** 즐겨찾기 */

export const FavoriteContentsAddRemove = () => {
  const [favoriteContents, setFavoriteContents] = useRecoilState(FavoriteAtom);
  const setFavoriteHandler = (contents: IContent[]) => {
    setFavoriteContents(contents);
    setFavoriteLocal(contents);
  };

  const addFavoriteContents = (data: IContent) => {
    if (data) {
      const addedContents = [data, ...favoriteContents];
      setFavoriteHandler(addedContents);
    }
  };

  const removeFavoriteContents = (data: IContent) => {
    if (data) {
      const removedContents = favoriteContents.filter((content) => content.id !== data.id);
      setFavoriteHandler(removedContents);
    }
  };

  return { addFavoriteContents, removeFavoriteContents };
};
