import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, detailSelector } from "../../../lib/Atoms";
import { IContent } from "../../../interface/Interface";
import Cover from "../../organisms/Detail/Cover";
import DescriptionBox from "../../organisms/Detail/Description/DescriptionContainer";

const DetailModalContainer = () => {
  const contentData = useRecoilValue<IContent>(detailSelector);
  const category = useRecoilValue<string>(categoryAtom);

  const contentsMatch = useMatch("/:dataId");
  const navigate = useNavigate();

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
        <Cover {...contentData} />
        <DescriptionBox {...contentData} />
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
