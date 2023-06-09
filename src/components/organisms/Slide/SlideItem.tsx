import React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import styled from "styled-components";
import { detailAPI } from "../../../api/Apis";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IContent } from "../../../interface/Interface";
import { ItemCaptionWrapper } from "../../atoms/Layout";
import { ButtonBox, ItemImageBanner, InfoBox, SkeletonCaption, TagBox } from "../../molecules/Item";

interface ISlideItem extends IContent {
  totalSlideItemNum: number;
}

/** 아이템 전체 Variants */
const contentVariants: Variants = {
  dummy: {
    opacity: 0,
    pointerEvents: "none",
  },
  normal: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.4,
    y: -70,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.15,
    },
  },
};

/** 호버 전에는 보이지 말아야 할 정보 박스에 대한 Variants */
const captionVariants: Variants = {
  normal: {
    opacity: 0,
    pointerEvents: "none",
  },
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

const SlideItem = ({
  id,
  title,
  name,
  backdrop_path,
  poster_path,
  media_type,
  category,
  totalSlideItemNum,
}: ISlideItem) => {
  const { setButtonOpacity, setButtonOpacityAfterDelay, setButtonOpacityAfterDelayInvalidation } = useButtonOpacity();
  const queryClient = useQueryClient();
  const control = useAnimation();

  const queryKey = ["detail", id];
  const queryFn = () => detailAPI({ id, media_type });

  const { data, isError } = useQuery<IContent | undefined>(queryKey, queryFn, {
    enabled: false,
  });

  /** 아이템에 마우스 호버 시 콘텐츠 상세 정보 요청 */
  /** 슬라이드 이동 버튼, 페이지 인디케이터 투명도 조절 */
  const onMouseEnterHandler = () => {
    queryClient.fetchQuery(queryKey, queryFn);
    if (id !== 0) setButtonOpacityAfterDelay(0);
  };

  /** 슬라이드 이동 버튼, 페이지 인디케이터 투명도 조절 */
  /** 호버 애니메이션 초기화 */
  const onMouseLeaveHandler = () => {
    setButtonOpacityAfterDelayInvalidation();
    setButtonOpacity(1);
    control.start("normal");
  };

  /** 슬라이드 이동 버튼, 페이지 인디케이터 투명도 조절 */
  const setButtonOpacityHandler = () => {
    setButtonOpacity(0);
  };

  return (
    <SlideItemContainer
      layoutId={category + id}
      variants={contentVariants}
      animate={control}
      initial="normal"
      transition={{ type: "tween" }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      totalslideitemnum={totalSlideItemNum}
    >
      <ItemImageBanner
        className={id === 0 ? "dummy" : ""}
        onMouseEnter={() => control.start("hover")}
        backdrop={backdrop_path}
        poster={poster_path}
        title={title}
        name={name}
      />
      <ItemCaptionWrapper variants={captionVariants}>
        {isError ? (
          <div>에러</div>
        ) : data ? (
          <React.Fragment>
            <ButtonBox onMouseEnter={setButtonOpacityHandler} {...data} media_type={media_type} category={category} />
            <InfoBox {...data} />
            <TagBox genres={data?.genres} />
          </React.Fragment>
        ) : (
          <SkeletonCaption />
        )}
      </ItemCaptionWrapper>
    </SlideItemContainer>
  );
};

export default React.memo(SlideItem);

const SlideItemContainer = styled(motion.div)<{ totalslideitemnum: number }>`
  width: calc(100% / ${({ totalslideitemnum }) => totalslideitemnum} - 4px);
  &:nth-child(${({ totalslideitemnum }) => totalslideitemnum}n + 2) {
    transform-origin: center left !important;
  }
  &:nth-child(${({ totalslideitemnum }) => totalslideitemnum}n - 1) {
    transform-origin: center right !important;
  }
  .dummy {
    opacity: 0;
    pointer-events: none;
  }
`;
