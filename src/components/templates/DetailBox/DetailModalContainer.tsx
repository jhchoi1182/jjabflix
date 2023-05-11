import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, detailSelector } from "../../../lib/Atoms";
import { IContent } from "../../../interface/Interface";
import Cover from "../../organisms/Detail/Cover";
import Description from "../../organisms/Detail/Description/Description";
import BackdropOverlay from "../../atoms/Layout/BackdropOverlay";

const DetailModalContainer = () => {
  const contentData = useRecoilValue<IContent>(detailSelector);
  const category = useRecoilValue<string>(categoryAtom);

  const contentsMatch = useMatch("/:dataId");


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
    <BackdropOverlay>
      <ContentsContainer layoutId={category + contentsMatch?.params.dataId} onClick={stopPropagationHandler}>
        <Cover {...contentData} />
        <Description {...contentData} />
      </ContentsContainer>
    </BackdropOverlay>
  );
};

export default DetailModalContainer;



const ContentsContainer = styled(motion.div)`
  width: 902.5px;
  margin: 30px auto 0px;
  background-color: ${(props) => props.theme.black.darker};
`;
