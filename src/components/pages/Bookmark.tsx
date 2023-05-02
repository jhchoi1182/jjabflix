import React from "react";
import styled from "styled-components";
import * as fonts from "../../styles/Fonts";
import { useRecoilValue } from "recoil";
import { FavoriteAtom } from "../../lib/Atoms";
import SlideItem from "../organisms/Slide/SlideItem";

const Bookmark = () => {
  const favoriteContents = useRecoilValue(FavoriteAtom);

  return (
    <BookmarkWrapper>
      <Title>내가 찜한 콘텐츠</Title>
      <ContentsBox>
        {favoriteContents?.map((content) => (
          <SlideItem key={content.id} {...content} />
        ))}
      </ContentsBox>
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

const ContentsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
