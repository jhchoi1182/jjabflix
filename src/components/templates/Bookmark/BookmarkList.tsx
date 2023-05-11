import React from "react";
import { useRecoilValue } from "recoil";
import BookmarkItem from "../../organisms/Bookmark/BookmarkItem";
import styled from "styled-components";
import { FavoriteAtom } from "../../../lib/atoms";

const BookmarkList = () => {
  const favoriteContents = useRecoilValue(FavoriteAtom);

  return (
    <BookmarkListContainer>
      {favoriteContents?.map((data) => (
        <BookmarkItem key={data.id} {...data} />
      ))}
    </BookmarkListContainer>
  );
};

export default BookmarkList;

const BookmarkListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 78px;
  grid-column-gap: 8px;
`;
