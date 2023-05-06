import React from "react";
import styled from "styled-components";
import * as fonts from "../../styles/Fonts";
import BookmarkListContainer from "../templates/Bookmark/BookmarkListContainer";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import DetailContainer from "../templates/DetailBox/DetailModalContainer";

const Bookmark = () => {
  const contentsMatch = useMatch("/bookmark/:dataId");

  return (
    <BookmarkWrapper>
      <Title>내가 찜한 콘텐츠</Title>
      <BookmarkListContainer />
      <AnimatePresence>
        {contentsMatch && (
          <React.Fragment>
            <DetailContainer />
          </React.Fragment>
        )}
      </AnimatePresence>
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
  padding-bottom: 8.5%;
`;
