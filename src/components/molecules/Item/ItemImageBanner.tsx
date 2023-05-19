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
  itemNum?: number;
  isSliding?: boolean;
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
  itemNum,
  isSliding,
}) => {
  return (
    <Image
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      bgimg={posterAPI(backdrop ?? poster, "w500")}
      index={index}
      itemnum={itemNum && itemNum - 1}
      issliding={isSliding ? true : undefined}
    >
      <Title index={index} itemnum={itemNum && itemNum - 1} issliding={isSliding ? true : undefined}>
        {title ?? name}
      </Title>
    </Image>
  );
};

export default ItemImageBanner;

const Image = styled(motion.div)<{ bgimg: string; index?: number; itemnum?: number; issliding?: boolean }>`
  ${ContentCoverImage}
  ${({ index, itemnum, bgimg, issliding }) =>
    !issliding &&
    (index === 0 || index === itemnum) &&
    css`
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${bgimg});
    `}
  height: 8.8vw;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)<{ index?: number; itemnum?: number; issliding?: boolean }>`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${font.RS_title}
  ${({ index, itemnum, issliding }) =>
    !issliding &&
    (index === 0 || index === itemnum) &&
    css`
      color: #727272;
    `}
`;
