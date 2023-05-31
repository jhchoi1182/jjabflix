import React, { useEffect } from "react";
import styled from "styled-components";
import BookmarkList from "../templates/Bookmark/BookmarkList";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import DetailModalContainer from "../templates/DetailModal/DetailModalContainer";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../lib/atoms";
import { font } from "../../styles/Fonts";

const Bookmark = () => {
  const { pathnameId } = useParams();
  const setHoveredCategory = useSetRecoilState(categoryAtom);

  useEffect(() => {
    setHoveredCategory("bookmark");
  }, [setHoveredCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Bookmark.Wrapper>
        <Bookmark.Title>내가 찜한 콘텐츠</Bookmark.Title>
        <BookmarkList />
        <AnimatePresence>{pathnameId && <DetailModalContainer pathnameId={pathnameId} />}</AnimatePresence>
      </Bookmark.Wrapper>
    </React.Fragment>
  );
};

export default Bookmark;

Bookmark.Wrapper = styled.div`
  padding: 76px 5vw;
  margin-bottom: 40rem;
  @media (max-width: 1099px) {
    margin-bottom: 15rem;
  }
  @media (max-width: 799px) {
    margin-bottom: 0rem;
  }
`;

Bookmark.Title = styled.h1`
  ${font.R_page_title}
  padding-bottom: 8.5%;
  @media (max-width: 1399px) {
    padding-bottom: 10.5%;
  }
  @media (max-width: 1099px) {
    padding-bottom: 14%;
  }
`;
