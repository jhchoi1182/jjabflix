import { Variants, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import SlideItemBannerImage from "../../molecules/Slide/SlideItemBannerImage";
import SlideItemButtonBox from "../../molecules/Slide/SlideItemButtonBox";
import SlideItemInfoBox from "../../molecules/Slide/SlideItemInfoBox";
import SlideItemTagBox from "../../molecules/Slide/SlideItemTagBox";
import { IContent } from "../../../interface/Interface";
import CaptionSection from "../../atoms/SlideCaptionSection";

const contentVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    zIndex: 1,
    y: -70,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    pointerEvents: "auto",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const BookmarkItem: React.FC<IContent> = ({ ...data }) => {
  const { title, name, backdrop_path, poster_path } = data;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BookmarkContent
      variants={contentVariants}
      whileHover={isHovered ? "hover" : "normal"}
      initial="normal"
      transition={{ type: "tween" }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SlideItemBannerImage
        onMouseEnter={() => setIsHovered(true)}
        backdrop={backdrop_path}
        poster={poster_path}
        title={title}
        name={name}
      />
      <BookmarkItemCaptionSection variants={infoVariants}>
        <SlideItemButtonBox {...data} />
        <SlideItemInfoBox {...data} />
        <SlideItemTagBox genres={data?.genres} />
      </BookmarkItemCaptionSection>
    </BookmarkContent>
  );
};

export default BookmarkItem;

const BookmarkContent = styled(motion.div)`
  margin-bottom: -129px;
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
`;

const BookmarkItemCaptionSection = styled(CaptionSection)`
  opacity: 0;
  pointer-events: none;
`;
