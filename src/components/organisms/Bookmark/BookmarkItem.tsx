import { Variants, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import SlideItemBannerImage from "../../molecules/Slide/SlideItemBannerImage";
import SlideCaptionSection from "../../atoms/SlideCaptionSection";
import SlideItemButtonBox from "../../molecules/Slide/SlideItemButtonBox";
import SlideItemInfoBox from "../../molecules/Slide/SlideItemInfoBox";
import SlideItemTagBox from "../../molecules/Slide/SlideItemTagBox";
import { IContent } from "../../../interface/Interface";

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
    display: "block",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

const BookmarkItem: React.FC<IContent> = ({ ...data }) => {
  const { title, name, backdrop_path, poster_path } = data;

  return (
    <BookmarkContent variants={contentVariants} whileHover="hover" initial="normal" transition={{ type: "tween" }}>
      <SlideItemBannerImage backdrop={backdrop_path} poster={poster_path} title={title} name={name} />
      <SlideCaptionSection variants={infoVariants}>
        <SlideItemButtonBox {...data} />
        <SlideItemInfoBox {...data} />
        <SlideItemTagBox genres={data?.genres} />
      </SlideCaptionSection>
    </BookmarkContent>
  );
};

export default BookmarkItem;

const BookmarkContent = styled(motion.div)`
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
`;
