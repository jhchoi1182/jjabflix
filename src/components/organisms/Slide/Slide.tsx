import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled, { css } from "styled-components";
import SlideItem from "./SlideItem";
import { IGetData } from "../../../interface/Interface";
import PageIndicator from "../../atoms/Slide/PageIndicator";
import SlidePaginationButton from "../../molecules/Slide/SlidePaginationButton";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import SlideTitle from "../../atoms/Slide/SlideTitle";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../../lib/atoms";
import { useOutletContext } from "react-router-dom";

type VariantsProps = {
  direction: string;
  calculateSlideGap: () => number;
  innerWidth: number;
};

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

const Slide: React.FC<ISlide> = ({ title, category, type, ...data }) => {
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const setHoveredCategory = useSetRecoilState(categoryAtom);
  const [direction, setDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  const [overflowY, setOverflowY] = useState("inherit");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [slideContentsNum, setSlideContentsNum] = useState(8);
  const [page, setPage] = useState(0);
  const zIndexRef = useRef<HTMLDivElement>(null);
  const { setButtonOpacity } = useButtonOpacity();

  /** 뷰 포트 너비 상태값으로 세팅 */

  useEffect(() => {
    const resizeHandler = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  /** 뷰 포트 너비에 따른 슬라이드 수 조절 */

  useEffect(() => {
    if (innerWidth >= 1400) return setSlideContentsNum(8);
    if (innerWidth >= 1100) return setSlideContentsNum(7);
    if (innerWidth >= 800) return setSlideContentsNum(6);
    if (innerWidth >= 500) return setSlideContentsNum(5);
    else return setSlideContentsNum(4);
  }, [innerWidth]);
  console.log(innerWidth);

  /** 슬라이드 시 슬라이드 페이지 간 생기는 공백 계산 */

  const calculateSlideGap = () => {
    if (innerWidth === 1920) return 145;
    if (slideContentsNum === 7) return 0.08 * innerWidth;
    if (slideContentsNum === 6) return 0.105 * innerWidth;
    if (slideContentsNum === 5) return 0.105 * innerWidth;
    if (slideContentsNum === 4) return 0.125 * innerWidth;
    else return 0.0698 * innerWidth;
  };

  /** 슬라이드 로직 */
  const showContentsNum = 6;
  const totalContents = data?.results?.length;
  const maxPage = Math.ceil(totalContents / showContentsNum);
  const showContentsArray = data?.results?.slice(
    (slideContentsNum - 2) * page,
    slideContentsNum + (slideContentsNum - 2) * page
  );

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

  /** 상세 정보 모달 오픈 여부에 따른 슬라이드 높이 변경으로 생기는 스크롤 제어 */
  useEffect(() => {
    if (pathnameId) setOverflowY("hidden");
    if (pathnameId === undefined) {
      setTimeout(() => {
        setOverflowY("inherit");
      }, 500);
    }
  }, [pathnameId]);

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
          transition={{ type: "tween", duration: 4 }}
          key={category + page}
          overflowy={overflowY}
        >
          {showContentsArray?.map((content, i) => {
            return (
              <SlideItem
                key={content.id}
                {...content}
                media_type={content.media_type ?? type}
                category={category}
                itemNum={slideContentsNum}
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
      {<SlidePaginationButton category={category} isSliding={isSliding} direction="next" nextSlide={nextSlide} />}
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

const FlexContainer = styled(motion.div)<{ overflowy: string }>`
  display: flex;
  position: absolute;
  gap: 8px;
  width: 100%;
  height: 170px;
  overflow-y: ${(props) => props.overflowy};
`;
