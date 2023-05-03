import React from "react";
import { useRecoilValue } from "recoil";
import BookmarkItem from "../../organisms/Bookmark/BookmarkItem";
import styled from "styled-components";
import { FavoriteAtom } from "../../../lib/Atoms";

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
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
