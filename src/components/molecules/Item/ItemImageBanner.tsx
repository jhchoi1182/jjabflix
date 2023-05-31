import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { posterAPI } from "../../../api/Apis";
import { flex } from "../../../styles/css";
import { ContentCoverImage } from "../../atoms/Layout";
import { font } from "../../../styles/Fonts";

interface ItemImageBannerProps {
  backdrop: string;
  poster: string;
  title: string;
  name?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}
const ItemImageBanner = ({
  className,
  onMouseEnter,
  onMouseLeave,
  backdrop,
  poster,
  title,
  name,
}: ItemImageBannerProps) => {
  return (
    <Image
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      bgimg={posterAPI(backdrop ?? poster, "w500")}
    >
      <ItemImageBanner.Title>{title ?? name}</ItemImageBanner.Title>
    </Image>
  );
};

export default ItemImageBanner;

const Image = styled(motion.div)<{ bgimg: string }>`
  ${ContentCoverImage}
  padding: 12px 10px;
  height: 8.8vw;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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

ItemImageBanner.Title = styled(motion.p)`
  height: 100%;
  ${flex("none", "end")}
  white-space: pre-wrap;
  ${font.RS_title}
`;
