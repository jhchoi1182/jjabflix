import { motion } from "framer-motion";
import styled from "styled-components";

interface IItemProps {
  bgImg: string;
}

const Item = ({ bgImg }: IItemProps) => {
  return <Content bgImg={bgImg}></Content>;
};

export default Item;

const Content = styled(motion.div)<{ bgImg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;
