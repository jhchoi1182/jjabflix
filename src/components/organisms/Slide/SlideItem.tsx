import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { detailAPI } from "../../../api/Apis";
import { useButtonOpacity } from "../../../utils/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../atoms/Loading/Loading";
import { IContent } from "../../../interface/Interface";
import SlideItemButtonBox from "../../molecules/Slide/SlideItemButtonBox";
import SlideItemInfoBox from "../../molecules/Slide/SlideItemInfoBox";
import SlideItemTagBox from "../../molecules/Slide/SlideItemTagBox";
import SlideItemBannerImage from "../../molecules/Slide/SlideItemBannerImage";
import SlideCaptionSection from "../../atoms/SlideCaptionSection";

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

const SlideItem: React.FC<IContent> = ({ id, title, name, backdrop_path, poster_path, media_type, category }) => {
  const { setButtonOpacity, setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation } = useButtonOpacity();
  const queryClient = useQueryClient();

  const queryKey = ["detail", title || name];
  const queryFn = () => detailAPI({ id, media_type });
  const dataOption = { cacheTime: 360000, staleTime: 360000 };

  const { data, isLoading, isError } = useQuery<IContent | undefined>(queryKey, queryFn, {
    enabled: false,
    ...dataOption,
  });

  const onMouseEnterHandler = async () => {
    await queryClient.fetchQuery(queryKey, queryFn, dataOption);
    setButtonOpacityAfterDelay(0);
  };
  const onMouseLeaveHandler = () => {
    setButtonOpacityAfterDelayInvalidation();
    setButtonOpacity(1);
  };

  const setButtonOpacityHandler = () => {
    setButtonOpacity(0);
  };

  return (
    <SlideContent
      layoutId={category + id}
      variants={contentVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <SlideItemBannerImage backdrop={backdrop_path} poster={poster_path} title={title} name={name} />
      <SlideCaptionSection variants={infoVariants}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>에러</div>
        ) : data ? (
          <React.Fragment>
            <SlideItemButtonBox
              onMouseEnter={setButtonOpacityHandler}
              {...data}
              media_type={media_type}
              category={category}
            />
            <SlideItemInfoBox {...data} />
            <SlideItemTagBox genres={data?.genres} />
          </React.Fragment>
        ) : null}
      </SlideCaptionSection>
    </SlideContent>
  );
};

export default SlideItem;

const SlideContent = styled(motion.div)`
  width: calc(100% / 8.2);
  &:nth-child(2) {
    transform-origin: center left !important;
  }
  &:nth-child(7) {
    transform-origin: center right !important;
  }
`;
