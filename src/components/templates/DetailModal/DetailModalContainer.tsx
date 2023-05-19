import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, detailSelector } from "../../../lib/atoms";
import { IContent } from "../../../interface/Interface";
import Cover from "../../organisms/Detail/Cover";
import DescriptionContainer from "../../organisms/Detail/Description/DescriptionContainer";
import { BackdropOverlay } from "../../atoms/Layout";

const DetailModalContainer = () => {
  const contentData = useRecoilValue<IContent>(detailSelector);

  /** 콘텐츠 아이템 눌렀을 때 해당 아이템의 layoutId와 상세 정보 모달의 layoutId를 매칭시켜 자연스럽게 모달로 연결되도록 애니메이션 구현 */
  const category = useRecoilValue<string>(categoryAtom);
  const { dataId } = useParams();
  const pressDetailButton = useLocation().search.split("/")[1];

  /** 배경 눌렀을 때 navigate(-1)되는 이벤트 캡쳐링 막기 */
  const stopPropagationHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  /** 모달이 열렸을 때 모달의 스크롤과 바디의 스크롤이 중첩되지 않도록 구현 */
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
      <ContentsContainer layoutId={category + (dataId ?? pressDetailButton)} onClick={stopPropagationHandler}>
        <Cover {...contentData} />
        <DescriptionContainer {...contentData} />
      </ContentsContainer>
    </BackdropOverlay>
  );
};

export default DetailModalContainer;

const ContentsContainer = styled(motion.div)`
  width: 902.5px;
  margin: 30px auto 0px;
  background-color: ${(props) => props.theme.black.darker};
  @media (max-width: 950px) {
    width: 93vw;
  }
`;
