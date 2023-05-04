import React from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, detailAtom } from "../../../lib/Atoms";
import { posterAPI } from "../../../api/Apis";
import { bgImg } from "../../atoms/BannerImage";

const DetaileContainer = () => {
  const contentData = useRecoilValue(detailAtom);
  const category = useRecoilValue(categoryAtom);
  const { scrollY } = useScroll();
  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();

  const closeOverlay = () => navigate("/");

  return (
    <AnimatePresence>
      {contentsMatch && (
        <DetailContainer onClick={closeOverlay}>
          <DetailBox layoutId={category + contentsMatch?.params.dataId} style={{ top: scrollY.get() + 100 }}>
            <Cover bgimg={posterAPI(contentData.backdrop_path ?? contentData.poster_path, "w500")}>
              <Title>{contentData.title}</Title>
            </Cover>
            <Overview>{contentData.overview}</Overview>
          </DetailBox>
        </DetailContainer>
      )}
    </AnimatePresence>
  );
};

export default DetaileContainer;

const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 999;
`;

const DetailBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 200vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  overflow: hidden;
  border-radius: 8px;
`;

const Cover = styled.div<{ bgimg: string }>`
  ${bgImg}
  position: relative;
  height: 400px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 4.6rem;
  position: absolute;
  bottom: 0;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
