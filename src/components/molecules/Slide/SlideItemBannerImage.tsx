import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { posterAPI } from "../../../api/Apis";
import { flex } from "../../../styles/Css";
import * as fonts from "../../../styles/Fonts";
import { bgImg } from "../../atoms/BannerImage";

type SlideItemBannerImageProps = {
  backdrop: string;
  poster: string;
  title: string;
  name?: string;
};
const SlideItemBannerImage: React.FC<SlideItemBannerImageProps> = ({ backdrop, poster, title, name }) => {
  return (
    <SlideImage bgimg={posterAPI(backdrop ?? poster, "w500")}>
      <Title>{title ?? name}</Title>
    </SlideImage>
  );
};

export default SlideItemBannerImage;

const SlideImage = styled(motion.div)<{ bgimg: string }>`
  ${bgImg}
  height: 170px;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${fonts.mid2}
  ${fonts.Heavy}
`;
