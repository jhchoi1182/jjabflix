import React, { useState, useRef, useMemo } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import SlideItem from "./SlideItem";
import { IGetData } from "../../../interface/Interface";
import PageIndicator from "../../atoms/Slide/PageIndicator";
import SlidePaginationButton from "../../molecules/Slide/SlidePaginationButton";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import SlideTitle from "../../atoms/Slide/SlideTitle";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../../lib/atoms";
import { useParams } from "react-router-dom";
import { useInnerWidth } from "../../../utils/Hooks";

interface VariantsProps {
  direction: string;
  calculateSlideGap: () => number;
  innerWidth: number;
}

/** 슬라이드 시 생기는 공백 제거 */
const rowVariants: Variants = {
  appearance: ({ direction, innerWidth, calculateSlideGap }: VariantsProps) => ({
    x: direction === "next" ? innerWidth - calculateSlideGap() : -innerWidth + calculateSlideGap(),
  }),
  center: () => ({
    x: 0,
  }),
  exit: ({ direction, innerWidth, calculateSlideGap }: VariantsProps) => ({
    x: direction === "next" ? -innerWidth + calculateSlideGap() : innerWidth - calculateSlideGap(),
  }),
};

interface ISlide extends IGetData {
  category: string;
  title: string;
  type?: string;
}

const Slide = ({ title, category, type, ...data }: ISlide) => {
  const { pathnameId } = useParams();
  const setHoveredCategory = useSetRecoilState(categoryAtom);
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [page, setPage] = useState(0);
  const zIndexRef = useRef<HTMLDivElement>(null);
  const { setButtonOpacity } = useButtonOpacity();
  const { innerWidth, totalSlideItemNum, bothSideExceptSlideItemNum } = useInnerWidth();
  console.log(innerWidth);

  /** 슬라이드 시 슬라이드 페이지 간 생기는 공백 계산 */
  const calculateSlideGap = () => {
    if (innerWidth === 1920) return 145;
    if (totalSlideItemNum === 7) return 0.08 * innerWidth;
    if (totalSlideItemNum === 6) return 0.105 * innerWidth;
    if (totalSlideItemNum === 5) return 0.105 * innerWidth;
    if (totalSlideItemNum === 4) return 0.125 * innerWidth;
    else return 0.0698 * innerWidth;
  };

  /** 슬라이드 구성 로직 */
  const totalContents = useMemo(() => data?.results?.length, [data?.results?.length]);

  const maxPage = useMemo(() => {
    if (totalContents % bothSideExceptSlideItemNum === 1)
      return Math.ceil(totalContents / bothSideExceptSlideItemNum) - 1;
    else return Math.ceil(totalContents / bothSideExceptSlideItemNum);
  }, [bothSideExceptSlideItemNum, totalContents]);

  const showContentsArray = useMemo(() => {
    return data?.results?.slice((totalSlideItemNum - 2) * page, totalSlideItemNum + (totalSlideItemNum - 2) * page);
  }, [data?.results, page, totalSlideItemNum]);

  /** 슬라이드 넘기는 로직 */
  const slidePrevent = () => setIsSliding((prev) => !prev);
  const prevSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("prev");
      slidePrevent();
      setPage((prev) => (prev === 0 ? maxPage : prev - 1));
    }
  };
  const nextSlide = async () => {
    if (data) {
      if (isSliding) return;
      await setDirection("next");
      slidePrevent();
      setPage((prev) => (prev === maxPage - 1 ? 0 : prev + 1));
    }
  };

  /** 슬라이드 이동 버튼, 페이지 인디케이터 투명도 조절 */
  /** 호버된 슬라이드가 커질 때 타 슬라이드보다 위로 올라오도록 zindex 조절 */
  const onMouseEnterHandler = () => {
    setHoveredCategory(category);
    setButtonOpacity(1);
    if (zIndexRef.current) {
      zIndexRef.current.style.zIndex = "1";
    }
  };
  const onMouseLeaveHandler = () => {
    setButtonOpacity(0);
    if (zIndexRef.current) {
      zIndexRef.current.style.zIndex = "0";
    }
  };

  return (
    <SlideContainer ref={zIndexRef} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <SlideTitle>{title}</SlideTitle>
      <PageIndicator maxPage={maxPage} page={page} category={category} />
      <AnimatePresence initial={false} onExitComplete={slidePrevent}>
        <FlexContainer
          variants={rowVariants}
          custom={{ direction, innerWidth, calculateSlideGap }}
          initial="appearance"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
        >
          {showContentsArray?.map((content, i) => {
            return (
              <SlideItem
                key={content.id}
                {...content}
                media_type={content.media_type ?? type}
                category={category}
                totalSlideItemNum={totalSlideItemNum}
                index={i}
                isSliding={isSliding}
              />
            );
          })}
        </FlexContainer>
      </AnimatePresence>
      {page !== 0 && (
        <SlidePaginationButton category={category} isSliding={isSliding} direction="prev" prevSlide={prevSlide} />
      )}
      {page !== maxPage - 1 && (
        <SlidePaginationButton category={category} isSliding={isSliding} direction="next" nextSlide={nextSlide} />
      )}
    </SlideContainer>
  );
};

export default React.memo(Slide);

const SlideContainer = styled.div`
  position: relative;
  margin: -65px -12% 0px -12%;
  margin-bottom: 18.7vw;
  @media (max-width: 1399px) {
    margin: -65px -15% 0px -15%;
    margin-bottom: 25.5rem;
  }
  @media (max-width: 1099px) {
    margin: -65px -18% 0px -18%;
    margin-bottom: 27%;
  }
  @media (max-width: 799px) {
    margin: -65px -26% 0px -26%;
    margin-bottom: calc(26% + 5.5rem);
  }
  @media (max-width: 499px) {
    margin: -65px -40% 0px -40%;
    margin-bottom: calc(41% + 5rem);
  }
`;

const FlexContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  gap: 8px;
  width: 100%;
  height: 170px;
`;
