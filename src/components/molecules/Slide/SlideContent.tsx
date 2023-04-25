import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { posterAPI } from "../../../api/Apis";
import { useSetRecoilState } from "recoil";
import { IResult, detailAtom } from "../../../lib/Atoms";
import * as fonts from "../../../styles/Css";
import { bgImg } from "../../atoms/Banner";
import { useOpacity } from "../../../utils/hooks";

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

const SlideContent: React.FC<IResult> = ({ ...content }) => {
  const { resetOpacityAfterDelay, resetOpacityAfterDelayInvalidation } = useOpacity({ out: 0 });
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();

  return (
    <Container
      layoutId={String(content.id)}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onMouseEnter={resetOpacityAfterDelay}
      onMouseLeave={resetOpacityAfterDelayInvalidation}
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

export default SlideContent;

const Container = styled(motion.div)`
  width: calc(100% / 8.2);
  &:nth-child(2) {
    transform-origin: center left !important;
  }
  &:nth-child(7) {
    transform-origin: center right !important;
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
