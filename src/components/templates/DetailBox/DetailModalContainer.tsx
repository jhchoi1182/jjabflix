import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, detailAtom } from "../../../lib/Atoms";
import { posterAPI } from "../../../api/Apis";
import { bgImg } from "../../atoms/BannerImage";

const DetailContainer = () => {
  const contentData = useRecoilValue(detailAtom);
  const category = useRecoilValue(categoryAtom);
  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();

  const closeOverlay = () => {
    navigate(-1);
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
    <Container onClick={closeOverlay}>
      <DetailBox layoutId={category + contentsMatch?.params.dataId}>
        <Cover bgimg={posterAPI(contentData.backdrop_path ?? contentData.poster_path, "w500")}>
          <Title>{contentData.title}</Title>
        </Cover>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
        <div style={{ fontSize: "4rem" }}>안녕</div>
      </DetailBox>
    </Container>
  );
};

export default DetailContainer;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DetailBox = styled(motion.div)`
  width: 902.5px;
  margin: 30px auto 0px;
  background-color: ${(props) => props.theme.black.darker};
`;

const Cover = styled.div<{ bgimg: string }>`
  ${bgImg}
  background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.bgimg});
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 4.6rem;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
