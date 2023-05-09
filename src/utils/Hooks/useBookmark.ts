/** 즐겨찾기 */

import { useRecoilState } from "recoil";
import { FavoriteAtom } from "../../lib/Atoms";
import { IContent } from "../../interface/Interface";
import { setFavoriteLocal } from "../Local";

export const useBookmark = () => {
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
