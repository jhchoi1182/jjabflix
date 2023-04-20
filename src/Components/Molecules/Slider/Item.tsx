import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { posterAPI } from "../../../Api/Apis";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IResult, detailAtom, sliderRefSelector } from "../../../Lib/Atoms";
import * as fonts from "../../../styles/Css";
import { bgImg } from "../../Atoms/Banner/Banner";

const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    display: "flex",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const Item: React.FC<IResult> = ({ ...content }) => {
  const setContentData = useSetRecoilState(detailAtom);
  const sliderRef = useRecoilValue(sliderRefSelector);

  const navigate = useNavigate();

  const mouseHoverHandler = () => {
    const { sliderArrowRef, sliderIndicatorRef } = sliderRef;
    if (sliderArrowRef && sliderIndicatorRef) {
      sliderArrowRef.style.opacity = "1";
      sliderIndicatorRef.style.opacity = "1";
    }
    setTimeout(() => {
      if (sliderArrowRef && sliderIndicatorRef) {
        sliderArrowRef.style.opacity = "0";
        sliderIndicatorRef.style.opacity = "0";
      }
    }, 500);
  };

  return (
    <Container
      layoutId={String(content.id)}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween", zIndex: 90 }}
      onMouseEnter={mouseHoverHandler}
    >
      <Banner bgimg={posterAPI(content.backdrop_path ?? content.poster_path, "w500")}>
        <Title>{content.title ?? content.name}</Title>
      </Banner>
      <ContentInfo variants={infoVariants}>
        <h4>{content.title ?? content.name}</h4>
        <button
          onClick={() => {
            setContentData(content);
            navigate(`/${content.id}`);
          }}
        >
          상세보기
        </button>
      </ContentInfo>
    </Container>
  );
};

export default Item;

const Container = styled(motion.div)`
  width: calc(100% / 8);
  &:nth-child(2) {
    transform-origin: center left;
  }
  &:nth-child(7) {
    transform-origin: center right;
  }
`;

const Banner = styled(motion.div)<{ bgimg: string }>`
  ${bgImg}
  height: 170px;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)`
  height: 100%;
  display: flex;
  align-items: end;
  white-space: pre-wrap;
  ${fonts.SmallTitle}
`;

const ContentInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  display: none;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
