import React from "react";
import styled from "styled-components";
import * as fonts from "../../styles/Fonts";
import BookmarkList from "../templates/Bookmark/BookmarkList";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import DetailContainer from "../templates/DetailModal/DetailModalContainer";
import { ChildrenProps } from "../../interface/type";

const Bookmark: React.FC & {
  Wrapper: React.FC<ChildrenProps>;
  Title: React.FC<ChildrenProps>;
} = () => {
  const contentsMatch = useMatch("/bookmark/:dataId");

  return (
    <Bookmark.Wrapper>
      <Bookmark.Title>내가 찜한 콘텐츠</Bookmark.Title>
      <BookmarkList />
      <AnimatePresence>{contentsMatch && <DetailContainer />}</AnimatePresence>
    </Bookmark.Wrapper>
  );
};

export default Bookmark;

Bookmark.Wrapper = styled.div`
  padding: 76px 60px;
`;

Bookmark.Title = styled.h1`
  ${fonts.large}
  ${fonts.bold}
  padding-bottom: 8.5%;
`;
