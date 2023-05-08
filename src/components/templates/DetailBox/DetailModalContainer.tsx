import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FavoriteAtom, categoryAtom, detailAtom } from "../../../lib/Atoms";
import { posterAPI } from "../../../api/Apis";
import { bgImg } from "../../atoms/BannerImage";
import * as fonts from "../../../styles/Fonts";
import { Play } from "../../molecules/Button/RectangleButton";
import { CircleAdd, CircleCheck } from "../../molecules/Button/CircleButton";
import { FavoriteContentsAddRemove } from "../../../utils/hooks";

const DetailModalContainer = () => {
  const { addFavoriteContents, removeFavoriteContents } = FavoriteContentsAddRemove();
  const favoriteContents = useRecoilValue(FavoriteAtom);
  const contentData = useRecoilValue(detailAtom);
  const category = useRecoilValue(categoryAtom);
  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();

  const isAdded = favoriteContents.some((content) => content.id === contentData.id);

  const stopPropagationHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, []);

  return (
    <BackdropOverlay onClick={() => navigate(-1)}>
      <Container layoutId={category + contentsMatch?.params.dataId} onClick={stopPropagationHandler}>
        <CoverBox bgimg={posterAPI(contentData.backdrop_path ?? contentData.poster_path, "w500")}>
          <Title>{contentData.title || contentData.name}</Title>
          <CoverButtonBox>
            <Play buttonSize="detailButton" />
            {isAdded ? (
              <CircleCheck buttonSize="detailButton" onClick={() => removeFavoriteContents(contentData)} />
            ) : (
              <CircleAdd buttonSize="detailButton" onClick={() => addFavoriteContents(contentData)} />
            )}
          </CoverButtonBox>
        </CoverBox>
        <TopInfoBox>
          <LeftDescriptionDiv></LeftDescriptionDiv>
          <RightDescriptionDiv></RightDescriptionDiv>
        </TopInfoBox>
      </Container>
    </BackdropOverlay>
  );
};

export default DetailModalContainer;

const BackdropOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  width: 902.5px;
  margin: 30px auto 0px;
  background-color: ${(props) => props.theme.black.darker};
`;

const CoverBox = styled.div<{ bgimg: string }>`
  ${bgImg}
  background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.bgimg});
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 53px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Title = styled.h3`
  ${fonts.big1}
  ${fonts.bold}
  color: ${(props) => props.theme.white.lighter};
  width: 50%;
  margin-bottom: 2rem;
`;

const CoverButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const TopInfoBox = styled.div`
  display: flex;
`;

const LeftDescriptionDiv = styled.div`
  width: 70%;
  background-color: green;
`;
const RightDescriptionDiv = styled.div`
  width: 30%;
  background-color: pink;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
