import React from "react";
import { useRecoilValue } from "recoil";
import Item from "../../organisms/Item/Item";
import { FavoriteAtom } from "../../../lib/atoms";
import { ItemGridContainer } from "../../atoms/Layout";

const BookmarkList = () => {
  const favoriteContents = useRecoilValue(FavoriteAtom);

  return (
    <ItemGridContainer>
      {favoriteContents?.map((data) => (
        <Item key={data.id} {...data} />
      ))}
    </ItemGridContainer>
  );
};

export default BookmarkList;
