import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import SlideItem from "./SlideItem";
import { IGetData } from "../../../interface/Interface";
import PageIndicator from "../../atoms/Slide/PageIndicator";
import SlideMoveButton from "../../molecules/Slide/SlidePaginationButton";
import { useButtonOpacity } from "../../../utils/Hooks/useButtonOpacity";
import SlideTitle from "../../atoms/Slide/SlideTitle";
import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../../../lib/atoms";
import { useOutletContext } from "react-router-dom";

type VariantsProps = {
  direction: string;
};

/** 슬라이드 시 공백 계산 */
const screenWidth = window.innerWidth;
const slideGap = () => {
  if (screenWidth === 1920) return 145;
  else return 0.0698 * screenWidth;
};

/** 슬라이드 시 생기는 공백 제거 */
const rowVariants: Variants = {
  appearance: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? screenWidth - slideGap() : -screenWidth + slideGap(),
  }),
  center: () => ({
    x: 0,
  }),
  exit: ({ direction }: VariantsProps) => ({
    x: direction === "next" ? -screenWidth + slideGap() : screenWidth - slideGap(),
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
  const [page, setPage] = useState(0);
  const zIndexRef = useRef<HTMLDivElement>(null);
  const { setButtonOpacity } = useButtonOpacity();

  /** 슬라이드 로직 */
  const slideContentsNum = 8;
  const showContentsNum = 6;
  const totalContents = data?.results?.length;
  const maxPage = Math.ceil(totalContents / showContentsNum);
  const showContentsArray = data?.results?.slice(
    (slideContentsNum - 2) * page,
    slideContentsNum + (slideContentsNum - 2) * page
  );
  // console.log(data.results);
  // console.log(showContentsArray);
  // console.log("data.results.length:", totalContents);

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
          custom={{ direction }}
          initial="appearance"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.75 }}
          key={category + page}
          overflowy={overflowY}
        >
          {showContentsArray?.map((content) => {
            return (
              <SlideItem
                key={content.id}
                {...content}
                media_type={content.media_type ?? type}
                category={category}
                itemNum={slideContentsNum}
              />
            );
          })}
        </FlexContainer>
      </AnimatePresence>
      {page !== 0 && <SlideMoveButton category={category} direction="prev" prevSlide={prevSlide} />}
      {<SlideMoveButton category={category} direction="next" nextSlide={nextSlide} />}
    </SlideContainer>
  );
};

export default Slide;

const SlideContainer = styled.div`
  position: relative;
  margin: -65px -12% 0px -12%;
  margin-bottom: 18.7vw;
`;

const FlexContainer = styled(motion.div)<{ overflowy: string }>`
  display: flex;
  position: absolute;
  gap: 8px;
  width: 100%;
  height: 170px;
  overflow-y: ${(props) => props.overflowy};
`;
