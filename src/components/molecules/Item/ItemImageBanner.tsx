import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
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
};
const ItemImageBanner: React.FC<ItemImageBannerProps> = ({
  className,
  onMouseEnter,
  onMouseLeave,
  backdrop,
  poster,
  title,
  name,
}) => {
  return (
    <Image className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} bgimg={posterAPI(backdrop ?? poster, "w500")}>
      <Title>{title ?? name}</Title>
    </Image>
  );
};

export default ItemImageBanner;

const Image = styled(motion.div)<{ bgimg: string }>`
  ${ContentCoverImage}
  height: 170px;
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title = styled(motion.p)`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${font.RS_title}
`;
