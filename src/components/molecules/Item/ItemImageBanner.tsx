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
      itemnum={itemNum}
      issliding={isSliding ? true : undefined}
    >
      <Title index={index} itemnum={itemNum} issliding={isSliding ? true : undefined}>
        {title ?? name}
      </Title>
    </Image>
  );
};

export default ItemImageBanner;

const Image = styled(motion.div)<{ bgimg: string; index?: number; itemnum?: number; issliding?: boolean }>`
  ${ContentCoverImage}
  padding: 12px 10px;
  height: 8.8vw;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /** 슬라이드 상태가 아닐 때 색상 */
  ${({ index, itemnum, bgimg, issliding }) =>
    index !== undefined &&
    !issliding &&
    (index === 0 || index === (itemnum && itemnum - 1)) &&
    css`
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${bgimg});
    `}
  @media (max-width: 1399px) {
    height: 13rem;
  }
  @media (max-width: 1099px) {
    height: 13.5vw;
  }
  @media (max-width: 799px) {
    height: 18vw;
  }
  @media (max-width: 499px) {
    height: 26vw;
  }
`;

const Title = styled(motion.p)<{ index?: number; itemnum?: number; issliding?: boolean }>`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${font.RS_title}
  /** 슬라이드 상태가 아닐 때 색상 */
  ${({ index, itemnum, issliding }) =>
    index !== undefined &&
    !issliding &&
    (index === 0 || index === (itemnum && itemnum - 1)) &&
    css`
      color: #727272;
    `}
`;
