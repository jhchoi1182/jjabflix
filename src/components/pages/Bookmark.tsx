import React from "react";
import styled from "styled-components";
import * as fonts from "../../styles/Fonts";
import BookmarkListContainer from "../templates/Bookmark/BookmarkListContainer";

const Bookmark = () => {
  return (
    <BookmarkWrapper>
      <Title>내가 찜한 콘텐츠</Title>
      <BookmarkListContainer />
    </BookmarkWrapper>
  );
};

export default Bookmark;

const BookmarkWrapper = styled.div`
  padding: 76px 60px;
`;

const Title = styled.h1`
  ${fonts.large}
  ${fonts.bold}
  padding-bottom: 5%;
`;
