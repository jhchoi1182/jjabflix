import { motion } from "framer-motion";
import styled from "styled-components";
import { IResult, posterAPI } from "../../../api";
import { useNavigate } from "react-router-dom";

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
          navigate(`/${data.id}`);
          showDetail(data.id);
        }}
        bg={posterAPI(data.backdrop_path || data.poster_path, "w500")}
      >
        <ItemInfo variants={infoVariants}>
          <h4>{data.title || data.name}</h4>
        </ItemInfo>
      </Content>
    </>
  );
};

export default Item;

const Content = styled(motion.div)<{ bg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bg});
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

const ItemInfo = styled(motion.div)`
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
