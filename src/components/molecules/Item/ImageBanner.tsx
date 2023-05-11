import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { posterAPI } from "../../../api/Apis";
import { flex } from "../../../styles/css";
import * as fonts from "../../../styles/Fonts";
import { bgImg } from "../../atoms/BannerImage";

type ImageBannerProps = {
  backdrop: string;
  poster: string;
  title: string;
  name?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
const ImageBanner: React.FC<ImageBannerProps> = ({ onMouseEnter, onMouseLeave, backdrop, poster, title, name }) => {
  return (
    <Image onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} bgimg={posterAPI(backdrop ?? poster, "w500")}>
      <Title>{title ?? name}</Title>
    </Image>
  );
};

export default ImageBanner;

const Image = styled(motion.div)<{ bgimg: string }>`
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
