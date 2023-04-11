import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { posterAPI } from "../../../Api/Apis";
import { useSetRecoilState } from "recoil";
import { IResult, detailAtom } from "../../../Lib/Atoms";
import * as fonts from "../../../Styles/Css";

const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.15,
      type: "tween",
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.15,
      type: "tween",
    },
  },
};

const Item = (data: IResult) => {
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();

  return (
    <Container
      layoutId={String(data.id)}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween", zIndex: 90 }}
    >
      <Banner
        onClick={() => {
          setContentData(data);
          navigate(`/${data.id}`);
        }}
        bg={posterAPI(data.backdrop_path ?? data.poster_path, "w500")}
      >
        <Title>{data.title ?? data.name}</Title>
      </Banner>
      <ContentInfo variants={infoVariants}>
        <h4>{data.title ?? data.name}</h4>
      </ContentInfo>
    </Container>
  );
};

export default Item;

const Container = styled(motion.div)`
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Banner = styled(motion.div)<{ bg: string }>`
  background-color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  padding: 10px;
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
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
