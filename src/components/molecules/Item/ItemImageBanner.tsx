import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";
import { posterAPI } from "../../../api/Apis";
import { flex } from "../../../styles/css";
import { ContentCoverImage } from "../../atoms/Layout";
import { font } from "../../../styles/Fonts";

type ItemImageBannerProps = {
  backdrop: string;
  poster: string;
  title: string;
  name?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  index?: number;
  maxIndex?: number;
};
const ItemImageBanner: React.FC<ItemImageBannerProps> = ({
  className,
  onMouseEnter,
  onMouseLeave,
  backdrop,
  poster,
  title,
  name,
  index,
  maxIndex,
}) => {
  return (
    <Image
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      bgimg={posterAPI(backdrop ?? poster, "w500")}
      index={index}
      maxIndex={maxIndex}
    >
      <Title index={index} maxIndex={maxIndex}>
        {title ?? name}
      </Title>
    </Image>
  );
};

export default ItemImageBanner;

const Image = styled(motion.div)<{ bgimg: string; index?: number; maxIndex?: number }>`
  ${ContentCoverImage}
  ${({ index, maxIndex, bgimg }) =>
    (index === 0 || index === maxIndex) &&
    css`
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${bgimg});
    `}
  height: 8.8vw;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)<{ index?: number; maxIndex?: number }>`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${font.RS_title}
  ${({ index, maxIndex }) =>
    (index === 0 || index === maxIndex) &&
    css`
      color: #727272;
    `}
`;
