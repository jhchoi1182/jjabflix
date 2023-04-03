import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { posterAPI } from "../../../Api/Apis";
import { IResult } from "../../../Interface/ApiInterface";
import { useSetRecoilState } from "recoil";
import { detailAtom } from "../../../Atom/Atoms";

const contentVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Item = (data: IResult) => {
  const setContentData = useSetRecoilState(detailAtom);
  const navigate = useNavigate();
  const showDetail = (id: number) => {
    // console.log(id);
  };

  return (
    <>
      <Content
        layoutId={String(data.id)}
        whileHover="hover"
        variants={contentVariants}
        initial="normal"
        transition={{ type: "tween" }}
        onClick={() => {
          setContentData(data);
          navigate(`/${data.id}`);
          showDetail(data.id);
        }}
        bgImg={posterAPI(data.backdrop_path || data.poster_path, "w500")}
      >
        <ContentInfo variants={infoVariants}>
          <h4>{data.title || data.name}</h4>
        </ContentInfo>
      </Content>
    </>
  );
};

export default Item;

const Content = styled(motion.div)<{ bgImg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const ContentInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
