import React from "react";
import { useRecoilValue } from "recoil";
import BookmarkItem from "../../organisms/Bookmark/BookmarkItem";
import styled from "styled-components";
import { FavoriteAtom } from "../../../lib/atoms";

const BookmarkListContainer = () => {
  const favoriteContents = useRecoilValue(FavoriteAtom);

  return (
    <BookmarkContainer>
      {favoriteContents?.map((data) => (
        <BookmarkItem key={data.id} {...data} />
      ))}
    </BookmarkContainer>
  );
};

export default BookmarkListContainer;

const BookmarkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 78px;
  grid-column-gap: 8px;
`;
