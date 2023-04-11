import React from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { detailAtom } from "../../../Lib/Atoms";
import { posterAPI } from "../../../Api/Apis";

const DetaileBox = () => {
  const contentData = useRecoilValue(detailAtom);
  const { scrollY } = useScroll();
  const contentsMatch = useMatch("/:dataId");

  return (
    <AnimatePresence>
      {contentsMatch && (
        <DetailBox layoutId={contentsMatch?.params.dataId} style={{ top: scrollY.get() + 100 }}>
          <Cover bgImg={posterAPI(contentData.backdrop_path ?? contentData.poster_path, "w500")} />
          <Title>{contentData.title ?? contentData.name}</Title>
          <Overview>{contentData.overview}</Overview>
        </DetailBox>
      )}
    </AnimatePresence>
  );
};

export default DetaileBox;

const DetailBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  overflow: hidden;
  border-radius: 8px;
`;

const Cover = styled.div<{ bgImg: string }>`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 4.6rem;
  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
